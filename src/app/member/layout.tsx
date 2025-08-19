import { UserHeader } from '@/components/UserHeader'

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <UserHeader />
      <main>{children}</main>
    </div>
  )
}
