'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const searchParams = useSearchParams();

  // Get company_id from the query params
  const companyId = searchParams.get('company_id');

  // Debugging - Log the company_id to the console
  useEffect(() => {
    console.log('Company ID:', companyId);
  }, [companyId]);

  return (
    <div>
      <h1>Callback Page</h1>
      <p>Company ID: {companyId}</p>  {/* Display the company_id */}
    </div>
  );
}
