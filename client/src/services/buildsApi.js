const API_BASE = '/api/builds'

async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong while saving your build.')
  }

  return data
}

export async function getAllBuilds() {
  const response = await fetch(API_BASE)
  return handleResponse(response)
}

export async function getBuild(id) {
  const response = await fetch(`${API_BASE}/${id}`)
  return handleResponse(response)
}

export async function createBuild(build) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(build)
  })

  return handleResponse(response)
}

export async function updateBuild(id, build) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(build)
  })

  return handleResponse(response)
}

export async function deleteBuild(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })

  return handleResponse(response)
}
