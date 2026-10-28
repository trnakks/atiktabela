import { galleryFamilies, galleryServices } from '@/content/gallery-services';
export function ServiceOptions() {
  return (
    <>
      {galleryFamilies.map((group) => (
        <optgroup key={group.id} label={group.title}>
          {galleryServices
            .filter((service) => service.family === group.id)
            .map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
        </optgroup>
      ))}
    </>
  );
}
