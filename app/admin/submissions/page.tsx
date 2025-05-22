"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { AdminDashboardLayout } from "@/components/admin/dashboard-layout"
import { SubmissionsTable } from "@/components/admin/submission-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import * as XLSX from 'xlsx'
import { toast } from "sonner"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"

interface ContactSubmission {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  resolved?: boolean
  status?: string
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-4 bg-red-50 rounded-lg">
      <h2 className="text-lg font-semibold text-red-800 mb-2">Something went wrong:</h2>
      <pre className="text-sm text-red-600 whitespace-pre-wrap mb-4">{error.message}</pre>
      <Button onClick={resetErrorBoundary} variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
        Try again
      </Button>
    </div>
  )
}

export default function ContactManagement() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch submissions with error handling
      const { data: submissionsData, error: submissionsError } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (submissionsError) {
        console.error("Error fetching submissions:", submissionsError)
        toast.error("Failed to fetch submissions")
        setSubmissions([])
      } else {
        setSubmissions(submissionsData || [])
      }

    } catch (error) {
      console.error("Error in fetchData:", error)
      toast.error("An error occurred while fetching data")
      setSubmissions([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSubmission = async (id: string) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => prev.filter(submission => submission.id !== id))
      toast.success("Submission deleted successfully")
    } catch (error) {
      console.error("Error deleting submission:", error)
      toast.error("Failed to delete submission")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSubmission = async (id: string, data: Partial<ContactSubmission>) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from("contact_submissions")
        .update(data)
        .eq('id', id)

      if (error) throw error

      setSubmissions(prev => 
        prev.map(submission => 
          submission.id === id ? { ...submission, ...data } : submission
        )
      )
      toast.success("Submission updated successfully")
    } catch (error) {
      console.error("Error updating submission:", error)
      toast.error("Failed to update submission")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/admin/login")
  }

  const exportToExcel = () => {
    try {
      const exportData = submissions.map(item => ({
        Date: new Date(item.created_at).toLocaleDateString(),
        Name: item.name,
        Email: item.email,
        Phone: item.phone || 'N/A',
        Subject: item.subject,
        Status: item.resolved ? 'Resolved' : 'Pending'
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Submissions')
      XLSX.writeFile(wb, 'contact_submissions.xlsx')
      toast.success("Data exported successfully")
    } catch (error) {
      console.error("Error exporting data:", error)
      toast.error("Failed to export data")
    }
  }

  return (
    <AdminDashboardLayout onSignOut={handleSignOut}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Contact Submissions</h1>
            <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export to Excel
            </Button>
          </div>

          <SubmissionsTable
            submissions={submissions}
            loading={loading}
            onDelete={handleDeleteSubmission}
            onUpdate={handleUpdateSubmission}
          />
        </div>
      </ErrorBoundary>
    </AdminDashboardLayout>
  )
} 