import {ArrowUpRight} from 'lucide-react';
import {PROFILE_BACKGROUND} from '../data/profileBackground';
import {Eyebrow} from './RoomParts';
export function AgencyInvitation() {
  return <section className="agency-invitation" aria-labelledby="agency-title"><div><Eyebrow>From my workbench to your business</Eyebrow><h2 id="agency-title">A bigger idea?<br/><em>Let’s build it.</em></h2></div><div><span className="agency-wordmark">LaunchSILO <small>LABS ↗</small></span><p>My agency brings together websites, e-commerce, SaaS, mobile applications, and video production. If you’re looking for our services, tell us what you have in mind.</p><a className="primary-link" href={PROFILE_BACKGROUND.agencyUrl} target="_blank" rel="noreferrer">Start a project with LaunchSILO <ArrowUpRight size={20}/></a></div></section>;
}
