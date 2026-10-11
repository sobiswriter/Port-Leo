import {PROFILE_BACKGROUND as profile} from '../data/profileBackground';
import {Eyebrow} from './RoomParts';
export function ProfileBackground() {
  const groups = [{label:'Experience',items:profile.experience},{label:'Education',items:profile.education},{label:'Training',items:profile.training}];
  return <section className="profile-background" aria-label="Education and professional background">
    {groups.map(({label,items})=><div className="background-column" key={label}><Eyebrow>{label}</Eyebrow>{items.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.place}</p><small>{item.detail}</small></article>)}</div>)}
  </section>;
}
