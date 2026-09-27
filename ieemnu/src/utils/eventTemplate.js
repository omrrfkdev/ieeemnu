import { EVENTS } from '../constants/events';

const defaultGallerySettings = {
  layout: 'masonry',
  columns: { mobile: 1, tablet: 2, desktop: 3 },
  gap: 16,
  enableLightbox: true,
  enableCarousel: true,
  enableFullscreen: true
};

const defaultAnimationSettings = {
  heroAnimation: 'parallax',
  contentAnimation: 'stagger',
  instructorAnimation: 'spotlight',
  galleryAnimation: 'fade-up'
};

export const createEvent = (data) => ({
  id: data.id || Date.now(),
  type: data.type || 'event',
  category: data.category || 'General',
  title: data.title,
  description: data.description,
  date: data.date,
  time: data.time,
  location: data.location,
  imageName: data.imageName,
  
  instructors: data.instructors || [],
  
  photos: data.photos || [],
  
  gallerySettings: {
    ...defaultGallerySettings,
    ...data.gallerySettings
  },
  
  animationSettings: {
    ...defaultAnimationSettings,
    ...data.animationSettings
  },
  
  schedule: data.schedule || [],
  highlights: data.highlights || [],
  relatedEvents: data.relatedEvents || []
});

export const addEvent = (eventData) => {
  const newEvent = createEvent(eventData);
  EVENTS.push(newEvent);
  return newEvent;
};

export const updateEvent = (id, updates) => {
  const index = EVENTS.findIndex(event => event.id.toString() === id.toString());
  if (index !== -1) {
    EVENTS[index] = { ...EVENTS[index], ...updates };
    return EVENTS[index];
  }
  return null;
};

export const deleteEvent = (id) => {
  const index = EVENTS.findIndex(event => event.id.toString() === id.toString());
  if (index !== -1) {
    const deleted = EVENTS.splice(index, 1)[0];
    return deleted;
  }
  return null;
};

export const addInstructorToEvent = (eventId, instructorData) => {
  const event = EVENTS.find(e => e.id.toString() === eventId.toString());
  if (event) {
    const newInstructor = {
      id: instructorData.id || Date.now(),
      animation: {
        delay: (event.instructors.length * 0.2),
        type: instructorData.animation?.type || 'fade-up'
      },
      ...instructorData
    };
    event.instructors.push(newInstructor);
    return newInstructor;
  }
  return null;
};

export const addPhotoToEvent = (eventId, photoData) => {
  const event = EVENTS.find(e => e.id.toString() === eventId.toString());
  if (event) {
    const newPhoto = {
      id: photoData.id || Date.now(),
      order: event.photos.length + 1,
      ...photoData
    };
    event.photos.push(newPhoto);
    return newPhoto;
  }
  return null;
};
