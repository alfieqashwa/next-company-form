
// READ
export async function getCompanies() {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies`
  const response = await fetch(URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error("Fetching Error")
  }

  return await response.json();
}

// CREATE
export async function createCompany(data) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies/create`
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// DELETE
export async function removeCompany(id) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies/delete`
  const response = await fetch(URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  return await response.json();
}