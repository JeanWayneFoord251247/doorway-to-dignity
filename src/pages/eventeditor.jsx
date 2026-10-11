import React, { useState } from 'react';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import '../css/eventeditor.css';
import Grainient from '../components/gradient.jsx'

function EventEditor({ isEdit = true }) {
  const [roles, setRoles] = useState(['Inventory management', 'Food Designator']);
  const [newRole, setNewRole] = useState('');

  const handleAddRole = () => {
    if (newRole.trim()) {
      setRoles([...roles, newRole.trim()]);
      setNewRole('');
    }
  };

  const handleRemoveRole = (indexToRemove) => {
    setRoles(roles.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <>
      <AnimatedBackground />
       <Grainient
          color1='#E9E3D5'
          color2='#13C0D1'
          color3='#E9E3D5'
          timeSpeed={1.0}
          colorBalance={0}
          warpStrength={4}
          warpFrequency={0}
          warpSpeed={2}
          warpAmplitude={80}
          blendAngle={0}
          blendSoftness={0}
          rotationAmount={0}
          noiseScale={0}
          grainAmount={0}
          grainScale={0.2}
          grainAnimated={false}
          contrast={2}
          gamma={2.5}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      <Navbar />

      <div className="editor-page">
        <main className="editor-container">
          <div className="editor-card">
            <h1 className="editor-title">
              {isEdit ? 'Edit/Update Event' : 'Create an Event'}
            </h1>

            <form className="editor-form" onSubmit={(e) => e.preventDefault()}>
              <div className="editor-top-grid">
                <div className="form-col left-col">
                  <div className="input-group">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Jars Of Hope"
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Rand Burg"
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label">Start and end of event</label>
                    <div className="time-picker-row">
                      <span className="time-sublabel">From</span>
                      <input type="text" className="form-input time-input" defaultValue="10am" />
                      <span className="time-sublabel">To</span>
                      <input type="text" className="form-input time-input" defaultValue="5pm" />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Pick a date</label>
                    <div className="date-dropdown-row">
                      <select className="form-select" defaultValue="August">
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                      </select>
                      <select className="form-select date-day" defaultValue="27">
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                      </select>
                      <select className="form-select date-year" defaultValue="2026">
                        <option>2026</option>
                        <option>2027</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-col middle-col">
                  <div className="input-group full-height-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Pack and prepare Jars of Hope filled with essential ingredients for families in need..."
                    />
                  </div>
                </div>

                <div className="form-col right-col">
                  <label className="form-label">Roles Needed</label>
                  <div className="roles-card">
                    <div className="roles-list">
                      {roles.map((role, idx) => (
                        <div key={idx} className="role-pill-item">
                          <span>{role}</span>
                          <button
                            type="button"
                            className="btn-role-remove"
                            onClick={() => handleRemoveRole(idx)}
                          >
                            –
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="add-role-row">
                      <input
                        type="text"
                        className="role-inline-input"
                        placeholder="New role name..."
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRole()}
                      />
                      <button
                        type="button"
                        className="btn-role-add"
                        onClick={handleAddRole}
                      >
                        + Add Role
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="editor-banner-section">
                <label className="form-label">Event Banner (Optional)</label>
                <p className="banner-sublabel">Edit/Update your previous banner image</p>

                <div className="banner-upload-box">
                  <div className="banner-icon-area">
                    <i className="fi fi-sr-picture"></i>
                  </div>
                  <div className="banner-text-area">
                    <span className="banner-upload-title">Event Banner (Optional)</span>
                    <span className="banner-upload-specs">JPG, PNG or WEBP. Recommended size 1200 x 450px</span>
                  </div>
                </div>
              </div>

              <div className="editor-footer-actions">
                <button type="button" className="btn-editor-cancel">
                  Cancel Event
                </button>
                <button type="submit" className="btn-editor-submit">
                  {isEdit ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default EventEditor;