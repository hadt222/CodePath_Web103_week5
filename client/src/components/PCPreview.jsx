import React from 'react'

const colorMap = {
  Black: '#111111',
  White: '#e9edf3',
  Red: '#b82132',
  Blue: '#2f6fe4',
  Green: '#1f8f5f',
  Silver: '#b3bccb'
}

const cpuBadgeMap = {
  'Intel i5': 'Intel Core',
  'Intel i7': 'Intel Core',
  'Intel i9': 'Intel Core',
  'AMD Ryzen 5': 'AMD Ryzen',
  'AMD Ryzen 7': 'AMD Ryzen',
  'AMD Ryzen 9': 'AMD Ryzen'
}

const PCPreview = ({ build, totalPrice }) => {
  const caseColor = colorMap[build.case_color] || colorMap.Black
  const glow = build.rgb ? '0 0 35px rgba(109, 243, 255, 0.8), 0 0 65px rgba(255, 81, 145, 0.55)' : 'none'

  return (
    <section className='panel preview-panel'>
      <div className='section-heading'>
        <p className='eyebrow'>Live Preview</p>
        <h2>Current rig</h2>
      </div>

      <div className='pc-scene'>
        <div className='pc-case' style={{ background: caseColor, boxShadow: glow }}>
          <div className='glass-panel'>
            <div className={build.rgb ? 'rgb-fans on' : 'rgb-fans'}>
              <span />
              <span />
              <span />
            </div>

            <div className='preview-badges'>
              <span>{cpuBadgeMap[build.cpu]}</span>
              <span>{build.gpu}</span>
            </div>

            <div className='spec-stack'>
              <strong>{build.build_name || 'Untitled build'}</strong>
              <p>{build.ram}</p>
              <p>{build.storage}</p>
              <p>{build.cooling}</p>
            </div>
          </div>
        </div>

        <div className='price-card'>
          <p className='eyebrow'>Estimated Price</p>
          <h3>${totalPrice}</h3>
          <p>{build.rgb ? 'RGB enabled' : 'RGB disabled'}</p>
        </div>
      </div>
    </section>
  )
}

export default PCPreview
