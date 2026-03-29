import React from 'react'
import {
  CASE_COLORS,
  COOLING_OPTIONS,
  CPU_OPTIONS,
  GPU_OPTIONS,
  RAM_OPTIONS,
  RGB_OPTIONS,
  STORAGE_OPTIONS
} from '../data/buildOptions'

const formatOption = (option) => `${option.label} ($${option.price})`

const BuildForm = ({
  build,
  totalPrice,
  errorMessage,
  submitLabel,
  onChange,
  onSubmit,
  isSaving = false,
  formRef
}) => {
  return (
    <form className='panel builder-form' onSubmit={onSubmit} ref={formRef}>
      <div className='section-heading'>
        <p className='eyebrow'>Configurator</p>
        <h1>Forge a custom gaming PC</h1>
        <p className='lead-copy'>
          Tune performance, aesthetics, and cooling, then save your build once the parts pass validation.
        </p>
      </div>

      <label htmlFor='build_name'>Build Name</label>
      <input
        id='build_name'
        name='build_name'
        placeholder='Nebula Striker'
        value={build.build_name}
        onChange={onChange}
        autoComplete='off'
      />

      <div className='form-grid'>
        <label>
          Case Color
          <select name='case_color' value={build.case_color} onChange={onChange}>
            {CASE_COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>

        <label>
          CPU
          <select name='cpu' value={build.cpu} onChange={onChange}>
            {CPU_OPTIONS.map((option) => (
              <option key={option.label} value={option.label}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          GPU
          <select name='gpu' value={build.gpu} onChange={onChange}>
            {GPU_OPTIONS.map((option) => (
              <option key={option.label} value={option.label}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          RAM
          <select name='ram' value={build.ram} onChange={onChange}>
            {RAM_OPTIONS.map((option) => (
              <option key={option.label} value={option.label}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Storage
          <select name='storage' value={build.storage} onChange={onChange}>
            {STORAGE_OPTIONS.map((option) => (
              <option key={option.label} value={option.label}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cooling
          <select name='cooling' value={build.cooling} onChange={onChange}>
            {COOLING_OPTIONS.map((option) => (
              <option key={option.label} value={option.label}>
                {formatOption(option)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset>
        <legend>RGB Lighting</legend>
        <div className='toggle-row'>
          {RGB_OPTIONS.map((option) => (
            <label key={option.label} className='toggle-chip'>
              <input
                type='radio'
                name='rgb'
                value={String(option.value)}
                checked={String(build.rgb) === String(option.value)}
                onChange={onChange}
              />
              <span>{formatOption(option)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className='status-row'>
        <div>
          <p className='eyebrow'>Total Price</p>
          <h2>${totalPrice}</h2>
        </div>
        {errorMessage ? <p className='status-error'>{errorMessage}</p> : <p className='status-ok'>Build is ready to save.</p>}
      </div>

      <button type='submit' disabled={isSaving || Boolean(errorMessage)}>
        {isSaving ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

export default BuildForm
