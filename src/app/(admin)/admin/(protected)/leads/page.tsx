import { LeadsManager } from "@/components/admin/leads-manager";
import { listLeads } from "@/lib/admin-service";

export default async function AdminLeadsPage() {
  const leads = await listLeads();

  return (
    <LeadsManager
      initialLeads={leads.map((lead) => ({
        id: lead.id,
        type: lead.type,
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        status: lead.status,
        locale: lead.locale,
        createdAt: lead.createdAt.toISOString(),
      }))}
    />
  );
}
