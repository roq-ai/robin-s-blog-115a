import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  status: string;
  inviter_id: string;
  invitee_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  user_invitation_inviter_idTouser?: UserInterface;
  user_invitation_invitee_idTouser?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  inviter_id?: string;
  invitee_id?: string;
  organization_id?: string;
}
