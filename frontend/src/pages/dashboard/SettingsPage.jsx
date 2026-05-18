import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Card, CardBody, CardHeader } from '@/components/ui/Card.jsx';
import { EmptyState } from '@/components/ui/EmptyState.jsx';
import { NavIcon } from '@/components/dashboard/icons/NavIcons.jsx';

const settingsSections = [
  { id: 'notifications', title: 'Notifications', description: 'Email and in-app alerts' },
  { id: 'privacy', title: 'Privacy', description: 'Data and visibility preferences' },
  { id: 'billing', title: 'Billing', description: 'Plans and payment methods' },
];

export function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account preferences and platform settings."
      />

      <section className="space-y-4">
        {settingsSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <h2 className="text-base font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-0.5 text-sm text-slate-500">{section.description}</p>
            </CardHeader>
            <CardBody>
              <EmptyState
                icon={<NavIcon name="settings" />}
                title="Coming soon"
                description={`${section.title} settings will be available in a future release.`}
              />
            </CardBody>
          </Card>
        ))}
      </section>
    </>
  );
}
