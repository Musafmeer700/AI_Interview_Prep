import { PageHeader } from '@/components/ui/PageHeader.jsx';
import { Card, CardBody } from '@/components/ui/Card.jsx';
import { useAuth } from '@/hooks/useAuth.js';

const statPlaceholders = [
  { label: 'Interviews completed', value: '—' },
  { label: 'Practice hours', value: '—' },
  { label: 'Average score', value: '—' },
  { label: 'Streak (days)', value: '—' },
];

export function OverviewPage() {
  const { user } = useAuth();

  return (
    <>
      <PageHeader
        title="Overview"
        description={`Welcome back, ${user?.fullName ?? 'there'}. Your interview metrics will appear here.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statPlaceholders.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardBody>
          <p className="text-sm text-slate-600">
            Interview modules are not connected yet. This overview is ready for future analytics
            and quick actions.
          </p>
        </CardBody>
      </Card>
    </>
  );
}
