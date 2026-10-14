import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import Grainient from '../components/gradient.jsx';
import '../css/faq.css';


const defaultFaqs = [
  {
    _id: '1',
    question: 'How do I know where and when to be?',
    answer: 'All event details including exact location, arrival time, and contact person will be listed on the event page and your dashboard.',
  },
  {
    _id: '2',
    question: 'Who signs my community hours booklet?',
    answer: 'The event coordinator or team leader on-site will sign off on your booklet at the end of the volunteer shift.',
  },
  {
    _id: '3',
    question: 'What Times are good for food donations?',
    answer: 'Donations can be dropped off between 08:00 and 16:00 on weekdays at our main center, or directly during scheduled food drive events.',
  },
  {
    _id: '4',
    question: 'Can I donate through 3rd Parties?',
    answer: 'Yes, verified third-party partners can deliver directly. Please inform us beforehand so we can properly register the contribution.',
  },
  {
    _id: '5',
    question: 'Can I cancel the day before an event?',
    answer: 'Yes, you can leave an event through your dashboard up to 12 hours before so another volunteer has the opportunity to fill your spot.',
  },
  {
    _id: '6',
    question: 'Can I invite my friends to volunteer?',
    answer: 'Absolutely! They can register their own volunteer account and sign up for any open slots on the available events list.',
  },
];

function FAQ() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  const fetchFaqs = async () => {
    try {
      const res = fetch(`${API_BASE}/api/faqs`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFaqs(data.length > 0 ? data : defaultFaqs);
    } catch {
      setFaqs(defaultFaqs);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData({ question: '', answer: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq, e) => {
    e.stopPropagation();
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await fetch(`${API_BASE}/api/faqs/${id}`, { method: 'DELETE' });
      setFaqs((prev) => prev.filter((item) => (item._id || item.id) !== id));
    } catch {
      setFaqs((prev) => prev.filter((item) => (item._id || item.id) !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) return;

    if (editingFaq) {
      try {
        const id = editingFaq._id || editingFaq.id;
        const res = await fetch(`${API_BASE}/api/faqs/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const updated = await res.json();
        setFaqs((prev) =>
          prev.map((item) => ((item._id || item.id) === id ? updated : item))
        );
      } catch {
        setFaqs((prev) =>
          prev.map((item) =>
            (item._id || item.id) === (editingFaq._id || editingFaq.id)
              ? { ...item, ...formData }
              : item
          )
        );
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/api/faqs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const created = await res.json();
        setFaqs((prev) => [...prev, created]);
      } catch {
        setFaqs((prev) => [...prev, { _id: Date.now().toString(), ...formData }]);
      }
    }

    setIsModalOpen(false);
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

      <main className="faq-page-wrapper">
        <div className="faq-header-row">
          <h1 className="faq-main-title">Frequently asked questions about volunteering</h1>
          {isAdmin && (
            <button type="button" className="btn-add-faq" onClick={handleOpenAdd}>
              <i className="fi fi-sr-plus"></i> Add Question
            </button>
          )}
        </div>

        <div className="faq-card-container">
          {faqs.map((faq) => {
            const key = faq._id || faq.id;
            const isOpen = openId === key;

            return (
              <div key={key} className={`faq-row-item ${isOpen ? 'open' : ''}`}>
                <div className="faq-question-bar" onClick={() => toggleAccordion(key)}>
                  <h3 className="faq-question-text">{faq.question}</h3>

                  <div className="faq-actions-group">
                    {isAdmin && (
                      <div className="faq-admin-controls" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="faq-control-btn edit"
                          onClick={(e) => handleOpenEdit(faq, e)}
                        >
                          <i className="fi fi-sr-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="faq-control-btn delete"
                          onClick={(e) => handleDelete(key, e)}
                        >
                          <i className="fi fi-sr-trash"></i>
                        </button>
                      </div>
                    )}
                    <span className={`faq-chevron-arrow ${isOpen ? 'rotated' : ''}`}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#00838f"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer-panel">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {isModalOpen && (
        <div className="faq-modal-overlay">
          <div className="faq-modal-card">
            <h2 className="faq-modal-title">
              {editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
            </h2>

            <form onSubmit={handleSubmit} className="faq-modal-form">
              <div className="faq-input-group">
                <label className="faq-input-label">Question</label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, question: e.target.value }))
                  }
                  className="faq-text-input"
                  placeholder="e.g. Can I bring my own equipment?"
                />
              </div>

              <div className="faq-input-group">
                <label className="faq-input-label">Answer</label>
                <textarea
                  required
                  rows={4}
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, answer: e.target.value }))
                  }
                  className="faq-text-area"
                  placeholder="Write the full response here..."
                />
              </div>

              <div className="faq-modal-btn-row">
                <button
                  type="button"
                  className="btn-faq-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-faq-save">
                  {editingFaq ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FAQ;