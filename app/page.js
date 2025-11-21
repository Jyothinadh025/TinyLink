'use client';

import { useState, useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [links, setLinks] = useState([]);
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all links
  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/links');
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error('Error fetching links:', err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const createLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_url: targetUrl,
          code: customCode || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create link');
        setLoading(false);
        return;
      }

      setSuccess('✨ Link created successfully!');
      setTargetUrl('');
      setCustomCode('');
      fetchLinks();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Network error');
    }

    setLoading(false);
  };

  const deleteLink = async (code) => {
    if (!confirm(`Delete link /${code}?`)) return;

    try {
      await fetch(`/api/links/${code}`, { method: 'DELETE' });
      fetchLinks();
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  // Updated clipboard function: Fallback + HTTPS/network safe
  const copyToClipboard = (code) => {
    const url = `${window.location.origin}/${code}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => alert('✅ Link copied to clipboard!'))
        .catch(() => alert('❌ Could not copy link!'));
    } else {
      // fallback for browsers with no clipboard support
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        alert('✅ Link copied to clipboard!');
      } catch (err) {
        alert('❌ Could not copy link!');
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="fade-in">
          <h1 className="gradient-text" style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            TinyLink 🔗
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '18px' }}>
            Create and manage your short links with style
          </p>
        </div>

        {/* Create Link Card */}
        <div className="glass fade-in" style={{
          padding: '32px',
          borderRadius: '16px',
          marginBottom: '40px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              width: '8px',
              height: '32px',
              borderRadius: '4px'
            }}></span>
            Create New Link
          </h2>

          <form onSubmit={createLink}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#e2e8f0'
              }}>
                Target URL *
              </label>
              <input
                type="url"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com/your-long-url"
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid #334155',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: 'white',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#e2e8f0'
              }}>
                Custom Code <span style={{ color: '#94a3b8', fontWeight: '400' }}>(optional, 6-8 characters)</span>
              </label>
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="mycustom"
                pattern="[a-zA-Z0-9]{6,8}"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '2px solid #334155',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: 'white',
                  transition: 'all 0.2s'
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '14px 16px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#fca5a5',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div style={{
                padding: '14px 16px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                color: '#6ee7b7',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary-glow"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '16px 24px',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {loading && <span className="spinner"></span>}
              {loading ? 'Creating...' : '✨ Create Short Link'}
            </button>
          </form>
        </div>

        {/* Links List */}
        <div className="fade-in">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700' }}>
              Your Links
            </h2>
            <span className="badge">
              {links.length} {links.length === 1 ? 'link' : 'links'}
            </span>
          </div>

          {links.length === 0 ? (
            <div className="glass" style={{
              padding: '60px 20px',
              textAlign: 'center',
              borderRadius: '16px'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
              <p style={{ color: '#94a3b8', fontSize: '16px' }}>
                No links yet. Create your first one above!
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {links.map((link, index) => (
                <div
                  key={link.id}
                  className="link-card glass fade-in"
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '20px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ marginBottom: '12px' }}>
                        <code style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#60a5fa',
                          background: 'rgba(59, 130, 246, 0.1)',
                          padding: '4px 12px',
                          borderRadius: '8px'
                        }}>
                          /{link.code}
                        </code>
                      </div>

                      <div style={{ marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', color: '#94a3b8', marginRight: '8px' }}>→</span>
                        <a
                          href={link.target_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '14px',
                            color: '#cbd5e1',
                            textDecoration: 'none',
                            wordBreak: 'break-all'
                          }}
                        >
                          {link.target_url}
                        </a>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#94a3b8' }}>
                        <span>👆 {link.clicks} clicks</span>
                        <span>📅 {new Date(link.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => copyToClipboard(link.code)}
                        style={{
                          background: 'rgba(59, 130, 246, 0.15)',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          color: '#60a5fa',
                          padding: '10px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        📋 Copy
                      </button>
                      <button
                        onClick={() => deleteLink(link.code)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#fca5a5',
                          padding: '10px 16px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
