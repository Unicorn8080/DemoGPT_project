import Footer from '@/components/ui/footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
      {/* <Footer /> */}
    </section>
  )
}