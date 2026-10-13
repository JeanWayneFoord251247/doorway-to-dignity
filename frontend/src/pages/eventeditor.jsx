import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import Grainient from '../components/gradient.jsx';
import '../css/eventeditor.css';

function EventEditor({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    fromTime: '10am',
    toTime: '5pm',
    dateMonth: 'August',
    dateDay: '27',
    dateYear: '2026',
    description: '',
    volunteersMax: 20,
    image: '',
  });

  const [roles, setRoles] = useState(['Inventory management', 'Food Designator']);
  const [newRole, setNewRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const fetchEventData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/events/${id}`);
          if (!res.ok) throw new Error('Event not found');
          const data = await res.json();

          const timeParts = (data.time || '10am - 5pm').split(' - ');
          const dateParts = (data.date || '27 August 2026').split(' ');

          setFormData({
            title: data.title || '',
            location: data.location || '',
            fromTime: timeParts[0] || '10am',
            toTime: timeParts[1] || '5pm',
            dateDay: dateParts[0] || '27',
            dateMonth: dateParts[1] || 'August',
            dateYear: dateParts[2] || '2026',
            description: data.description || '',
            volunteersMax: data.volunteersMax || 20,
            image: data.image || '',
          });

          if (data.image) setImagePreview(data.image);
          if (data.rolesNeeded && data.rolesNeeded.length > 0) {
            setRoles(data.rolesNeeded);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

      fetchEventData();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRole = () => {
    if (newRole.trim() && !roles.includes(newRole.trim())) {
      setRoles([...roles, newRole.trim()]);
      setNewRole('');
    }
  };

  const handleRemoveRole = (indexToRemove) => {
    setRoles(roles.filter((_, idx) => idx !== indexToRemove));
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in as an admin to perform this action.');
      navigate('/login');
      return;
    }

    if (!formData.title.trim() || !formData.location.trim() || !formData.description.trim()) {
      alert('Please fill in the title, location, and description.');
      return;
    }

    if (!formData.image) {
      alert('Please upload an event banner image.');
      return;
    }

    setLoading(true);

    const formattedDate = `${formData.dateDay} ${formData.dateMonth} ${formData.dateYear}`;
    const formattedTime = `${formData.fromTime} - ${formData.toTime}`;

    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      date: formattedDate,
      time: formattedTime,
      rolesNeeded: roles,
      volunteersMax: Number(formData.volunteersMax) || 20,
      image: formData.image,
    };

    try {
      const endpoint = isEdit && id
        ? `http://localhost:5000/api/events/${id}`
        : 'http://localhost:5000/api/events';

      const method = isEdit && id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save event');
      }

      alert(isEdit ? 'Event updated successfully!' : 'Event created successfully!');
      navigate('/admin');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Grainient
        color1="#E9E3D5"
        color2="#13C0D1"
        color3="#E9E3D5"
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
            <h1 className="editor-title">{isEdit ? 'Edit/Update Event' : 'Create an Event'}</h1>

            <form className="editor-form" onSubmit={handleSubmit}>
              <div className="editor-top-grid">
                <div className="form-col left-col">
                  <div className="input-group">
                    <label className="form-label" htmlFor="title">Event Name</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="form-input"
                      placeholder="Jars Of Hope"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      className="form-input"
                      placeholder="Randburg"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="form-label">Start and end of event</label>
                    <div className="time-picker-row">
                      <span className="time-sublabel">From</span>
                      <input
                        type="text"
                        name="fromTime"
                        className="form-input time-input"
                        value={formData.fromTime}
                        onChange={handleChange}
                      />
                      <span className="time-sublabel">To</span>
                      <input
                        type="text"
                        name="toTime"
                        className="form-input time-input"
                        value={formData.toTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Pick a date</label>
                    <div className="date-dropdown-row">
                      <select
                        name="dateMonth"
                        className="form-select"
                        value={formData.dateMonth}
                        onChange={handleChange}
                      >
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>

                      <select
                        name="dateDay"
                        className="form-select date-day"
                        value={formData.dateDay}
                        onChange={handleChange}
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                          <option key={d} value={String(d)}>
                            {d}
                          </option>
                        ))}
                      </select>

                      <select
                        name="dateYear"
                        className="form-select date-year"
                        value={formData.dateYear}
                        onChange={handleChange}
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label" htmlFor="volunteersMax">Volunteer Capacity</label>
                    <input
                      id="volunteersMax"
                      name="volunteersMax"
                      type="number"
                      min="1"
                      className="form-input"
                      value={formData.volunteersMax}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-col middle-col">
                  <div className="input-group full-height-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-textarea"
                      placeholder="Pack and prepare Jars of Hope filled with essential ingredients for families in need..."
                      value={formData.description}
                      onChange={handleChange}
                      required
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
                            aria-label={`Remove role ${role}`}
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddRole();
                          }
                        }}
                      />
                      <button type="button" className="btn-role-add" onClick={handleAddRole}>
                        + Add Role
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="editor-banner-section">
                <label className="form-label">Event Banner</label>
                <p className="banner-sublabel">Upload the banner image for this event</p>

                <label className="banner-upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    hidden
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Event Banner Preview"
                      className="banner-preview-img"
                    />
                  ) : (
                    <>
                      <div className="banner-icon-area">
                        <i className="fi fi-sr-picture"></i>
                      </div>
                      <div className="banner-text-area">
                        <span className="banner-upload-title">Click to upload banner image</span>
                        <span className="banner-upload-specs">
                          JPG, PNG or WEBP. Recommended size 1200 x 450px
                        </span>
                      </div>
                    </>
                  )}
                </label>
              </div>

              <div className="editor-footer-actions">
                <button
                  type="button"
                  className="btn-editor-cancel"
                  onClick={() => navigate('/admin')}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-editor-submit" disabled={loading}>
                  {loading ? 'Saving...' : isEdit ? 'Update Event' : 'Create Event'}
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