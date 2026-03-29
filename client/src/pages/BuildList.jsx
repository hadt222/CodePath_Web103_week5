import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteBuild, getAllBuilds } from '../services/buildsApi'

const BuildList = () => {
  const [builds, setBuilds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSeeding, setIsSeeding] = useState(false)

  useEffect(() => {
    const loadBuilds = async () => {
      try {
        const data = await getAllBuilds()
        setBuilds(data)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBuilds()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteBuild(id)
      setBuilds((currentBuilds) => currentBuilds.filter((build) => build.id !== id))
    } catch (deleteError) {
      setError(deleteError.message)
    }
  }

  const handleSeed = async () => {
    try {
      setIsSeeding(true)
      const response = await fetch('/api/builds/seed', { method: 'POST' })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unable to seed sample builds.')
      }

      setBuilds(data.builds)
      setError('')
    } catch (seedError) {
      setError(seedError.message)
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <main className='page-stack'>
      <section className='panel list-hero'>
        <p className='eyebrow'>Saved Configurations</p>
        <h1>Build library</h1>
        <p className='lead-copy'>Review every saved PC, compare part tiers, and jump back into editing when you want to tune performance.</p>
        <div className='card-actions'>
          <button type='button' className='contrast' onClick={handleSeed} disabled={isSeeding}>
            {isSeeding ? 'Adding Samples...' : 'Add Sample Builds'}
          </button>
        </div>
      </section>

      {isLoading ? <section className='panel'><p>Loading builds...</p></section> : null}
      {error ? <section className='panel'><p className='status-error'>{error}</p></section> : null}
      {!isLoading && !error && builds.length === 0 ? (
        <section className='panel'>
          <p>No builds saved yet. Head back to the builder and create your first rig.</p>
        </section>
      ) : null}

      <section className='build-grid'>
        {builds.map((build) => (
          <article key={build.id} className='build-card'>
            <div className={`build-thumb ${String(build.case_color || '').toLowerCase()}`} />
            <p className='eyebrow'>#{build.id}</p>
            <h2>{build.build_name}</h2>
            <p>{build.cpu}</p>
            <p>{build.gpu}</p>
            <p>{build.ram} • {build.storage}</p>
            <h3>${build.total_price}</h3>
            <div className='card-actions'>
              <Link to={`/builds/${build.id}`} role='button' className='secondary'>View</Link>
              <Link to={`/builds/${build.id}/edit`} role='button' className='contrast'>Edit</Link>
              <button type='button' className='outline' onClick={() => handleDelete(build.id)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default BuildList
