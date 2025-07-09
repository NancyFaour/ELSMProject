'use client';

import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <div className="contact-box">
        <div className="contact-item">
          <MapPinIcon className="contact-icon" />
          <p>
            <strong>Office Address</strong><br />
            1201 Park Street, Fifth Avenue
          </p>
        </div>
      </div>

      <div className="contact-box">
        <div className="contact-item">
          <PhoneIcon className="contact-icon" />
          <p>
            <strong>Phone Number</strong><br />
            +22698 745 632, 02 982 745
          </p>
        </div>
      </div>

      <div className="contact-box">
        <div className="contact-item">
          <EnvelopeIcon className="contact-icon" />
          <p>
            <strong>Send Email</strong><br />
            admineLMS@gmil.com
          </p>
        </div>
      </div>

      <div className="contact-box">
        <div className="contact-item">
          <GlobeAltIcon className="contact-icon" />
          <p>
            <strong>Our Website</strong><br />
            www.admineLMS.gmil.com
          </p>
        </div>
      </div>
    </div>
  );
}
