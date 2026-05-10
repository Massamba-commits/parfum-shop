import { useState } from 'react'
import Footer from '../composants/Footer'

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [envoye, setEnvoye] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.nom || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setEnvoye(true)
      setForm({ nom: '', email: '', sujet: '', message: '' })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ───── HERO ───── */}
      <section
        className="relative py-16 px-6 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0010 0%, #3d0030 50%, #1a0010 100%)' }}
      >
        <div
          className="absolute w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', top: '-60px', left: '-60px' }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f9a8d4, transparent)', bottom: '-40px', right: '-40px' }}
        />
        <p className="text-pink-300 uppercase tracking-widest text-xs mb-2 font-semibold">
          ✦ Nous contacter ✦
        </p>
        <h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-3"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Contact
        </h1>
        <p className="text-pink-200 text-base max-w-md mx-auto">
          Une question, une commande, ou simplement envie de nous écrire ? Nous sommes là pour vous.
        </p>
      </section>

      {/* ───── CARTES INFOS ───── */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            icon: '📍',
            titre: 'Adresse',
            lignes: ['Rue 10, Quartier Médina', 'Thiès, Sénégal'],
          },
          {
            icon: '📞',
            titre: 'Téléphone',
            lignes: ['+221 77 000 00 00', 'Lun – Sam : 9h à 19h'],
          },
          {
            icon: '📧',
            titre: 'Email',
            lignes: ['contact@amkoparfumerie.sn', 'Réponse sous 24h'],
          },
        ].map((info) => (
          <div
            key={info.titre}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center"
          >
            <div className="text-4xl mb-3">{info.icon}</div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">{info.titre}</h3>
            {info.lignes.map((l) => (
              <p key={l} className="text-gray-500 text-sm">{l}</p>
            ))}
          </div>
        ))}
      </section>

      {/* ───── FORMULAIRE + CARTE ───── */}
      <section className="max-w-5xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Formulaire */}
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Envoyez-nous un message
          </h2>
          <p className="text-gray-400 text-sm mb-6">Tous les champs marqués * sont obligatoires.</p>

          {envoye ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Message envoyé !</h3>
              <p className="text-gray-400 text-sm mb-6">
                Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => setEnvoye(false)}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition font-semibold"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Nom complet *</label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  placeholder="Ex : Aminata Diallo"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Adresse email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Ex : aminata@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                />
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Sujet</label>
                <select
                  name="sujet"
                  value={form.sujet}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 transition bg-white"
                >
                  <option value="">Choisir un sujet</option>
                  <option>Commande & Livraison</option>
                  <option>Retour & Remboursement</option>
                  <option>Conseil parfum</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Écrivez votre message ici..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 transition resize-none"
                />
              </div>

              {/* Bouton */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition shadow hover:shadow-pink-300 active:scale-95 disabled:opacity-60"
              >
                {loading ? '⏳ Envoi en cours...' : 'Envoyer le message ✉️'}
              </button>
            </div>
          )}
        </div>

        {/* Infos supplémentaires + Réseaux */}
        <div className="flex flex-col gap-6">

          {/* Horaires */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              🕐 Horaires d'ouverture
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              {[
                { jour: 'Lundi – Vendredi', heure: '9h00 – 19h00' },
                { jour: 'Samedi', heure: '9h00 – 17h00' },
                { jour: 'Dimanche', heure: 'Fermé' },
              ].map((h) => (
                <div key={h.jour} className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-medium">{h.jour}</span>
                  <span className={h.heure === 'Fermé' ? 'text-red-400 font-semibold' : 'text-pink-500 font-semibold'}>
                    {h.heure}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              🌐 Suivez-nous
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Facebook', icon: '📘', lien: '#' },
                { label: 'Instagram', icon: '📸', lien: '#' },
                { label: 'WhatsApp', icon: '💬', lien: '#' },
                { label: 'TikTok', icon: '🎵', lien: '#' },
              ].map((r) => (
                <a
                  key={r.label}
                  href={r.lien}
                  className="flex items-center gap-2 border border-gray-100 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 hover:border-pink-400 hover:text-pink-500 hover:bg-pink-50 transition"
                >
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* FAQ rapide */}
          <div className="bg-pink-50 rounded-3xl p-6 border border-pink-100">
            <h3 className="font-bold text-gray-800 text-lg mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              ❓ Questions fréquentes
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>🚚 <span className="font-semibold">Délai de livraison :</span> 24h à 48h après commande.</p>
              <p>↩ <span className="font-semibold">Retour :</span> Gratuit sous 7 jours si produit intact.</p>
              <p>💳 <span className="font-semibold">Paiement :</span> Wave, Orange Money, carte bancaire.</p>
              <p>🎁 <span className="font-semibold">Emballage cadeau :</span> Offert sur toutes les commandes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── BANNIÈRE FINALE ───── */}
      <section
        className="py-12 px-6 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #1a0010, #3d0030)' }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Besoin d'aide immédiate ?
        </h2>
        <p className="text-pink-200 mb-6 text-sm">Contactez-nous directement sur WhatsApp pour une réponse rapide.</p>
        <a
          href="https://wa.me/221770000000"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition shadow-lg"
        >
          💬 Écrire sur WhatsApp
        </a>
      </section>
    </div>
  )
}