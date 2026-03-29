import React from 'react'
import { PREBUILT_BUILDS } from '../data/prebuiltBuilds'

const PrebuiltGallery = ({ activeBuildName, onLoadPrebuilt }) => {
  return (
    <section className='panel prebuilt-panel'>
      <div className='section-heading'>
        <p className='eyebrow'>Prebuilt Picks</p>
        <h2>Start from a tuned rig</h2>
        <p className='lead-copy'>
          Use one of these presets to jump straight into editing, or save them as inspiration for your own custom build.
        </p>
      </div>

      <div className='prebuilt-grid'>
        {PREBUILT_BUILDS.map((build) => (
          <article
            key={build.build_name}
            className={activeBuildName === build.build_name ? 'prebuilt-card active' : 'prebuilt-card'}
          >
            <img src={build.image} alt={build.build_name} className='prebuilt-image' />
            <div className='prebuilt-copy'>
              <p className='eyebrow'>{build.case_color} Case</p>
              <h3>{build.build_name}</h3>
              <p>{build.tagline}</p>
              <p>{build.cpu} • {build.gpu}</p>
              <p>{build.ram} • {build.storage}</p>
              <strong>${build.total_price}</strong>
            </div>
            <button type='button' className='contrast' onClick={() => onLoadPrebuilt(build)}>
              {activeBuildName === build.build_name ? 'Loaded Below' : 'Load This Build'}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PrebuiltGallery
