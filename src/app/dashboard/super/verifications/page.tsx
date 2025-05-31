import dynamic from "next/dynamic";

const VerificationRequests = dynamic(() => import('./VerificationsList'), {
  loading: () => <p>Загрузка...</p>,
});

export default function KycPage() {
	return (
		<div>
			<VerificationRequests />
		</div>
	)
}

