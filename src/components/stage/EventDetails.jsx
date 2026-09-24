import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

export default function EventDetails({ show }) {
  return (
    <div className={`gos-details ${show ? "is-in" : ""}`}>
      <div className="gos-details__card">
        <div className="gos-details__row">
          <span className="gos-details__icon">
            <Calendar size={15} aria-hidden="true" />
          </span>
          <div>
            <span className="gos-details__label">Date</span>
            <span className="gos-details__value">Monday, 12 October 2026</span>
          </div>
        </div>
        <div className="gos-details__sep" aria-hidden="true" />
        <div className="gos-details__row">
          <span className="gos-details__icon">
            <Clock size={15} aria-hidden="true" />
          </span>
          <div>
            <span className="gos-details__label">Time</span>
            <span className="gos-details__value">10:30 AM onwards</span>
          </div>
        </div>
        <div className="gos-details__sep" aria-hidden="true" />
        <div className="gos-details__row">
          <span className="gos-details__icon">
            <MapPin size={15} aria-hidden="true" />
          </span>
          <div>
            <span className="gos-details__label">Venue</span>
            <span className="gos-details__value">Parekh Vinayaka Mall, BH Road</span>
          </div>
        </div>
      </div>
    </div>
  );
}
