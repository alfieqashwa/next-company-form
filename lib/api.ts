/*
* ========== COMPANY ==========
*/

import { Company, Prisma } from 'lib/prisma';

// READ COMPANIES
export async function getAllCompanies() {
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

// READ A COMPANY
export async function getCompany(id: string | string[] | undefined) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies/${id}`
  const response = await fetch(URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error("Fetching Error")
  }

  return await response.json();
}

// CREATE A COMPANY
export async function createCompany(data: Prisma.CompanyCreateInput) {
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

// DELETE A COMPANY
export async function removeCompany(id: string) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/companies/delete`
  const response = await fetch(URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  return await response.json();
}

/*
* ========== OFFICE ==========
*/

// CREATE AN OFFICE
export async function createOffice(data: Prisma.OfficeCreateInput) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/offices/create`
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

// DELETE AN OFFICE
export async function removeOffice(id: string) {
  const URL = `${process.env.NEXT_PUBLIC_URL}/api/offices/delete`
  const response = await fetch(URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  return await response.json();
}
