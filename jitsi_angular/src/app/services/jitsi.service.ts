import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Injectable({
  providedIn: 'root'
})
export class JitsiService {
  api: any;
  user: User;
  namePrincipalRoom: String;
  options: any;
  domain: string = 'meet.jit.si';

    isAudioMuted = true;
    isVideoMuted = true;

    constructor(private route: Router) {
      this.user = new User();
      this.namePrincipalRoom = 'MeetingRoom';
    }

  moveRoom(nameRoom: String): void {
    const myNode = document.getElementById('jitsi-iframe');
    console.log(nameRoom);
    if (myNode) {
        myNode.innerHTML = '';
    }

    this.options = {
      roomName: nameRoom,
      width: 900,
      height: 500,

      configOverwrite: {
        prejoinPageEnabled: this.user.name != '' ? false : true,
      },
      interfaceConfigOverwrite: {
        startAudioMuted: true,
        startVideoMuted: true,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
        email: '',
      },
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.api.addEventListeners({
      participantLeft: this.handleParticipantLeft,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      participantRoleChanged: this.participantRoleChanged,
      passwordRequired: this.passwordRequired,
      endpointTextMessageReceived: this.endpointTextMessageReceived,
    });
  }

  changeRouterLink(value: any) {
    this.namePrincipalRoom = value;

    const myNode = document.getElementById('jitsi-iframe');
    if (myNode) {
      myNode.innerHTML = '';
    }

    this.options = {
      roomName: this.namePrincipalRoom,
      width: 900,
      height: 500,
      configOverwrite: {
        prejoinPageEnabled: false,
        openBridgeChannel: 'datachannel',
      },
      interfaceConfigOverwrite: {
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      },
    };
    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  }


  endpointTextMessageReceived = async (event: { data: { eventData: { text: string; }; }; }) => {
    if ((event.data.eventData.text = 'mover a principal')) {
      this.moveRoom('channel 1');
    }
  };

  passwordRequired = async () => {
    this.api.executeCommand('password', 'The Password');
  };

  handleParticipantLeft = async (participant: any) => {
    const data = await this.getParticipants();
  };

  participantRoleChanged = async (participant: any) => {
      this.api.executeCommand('password', 'The Password');
  };


  handleVideoConferenceJoined = async (participant: any) => {
    this.user.setName(participant.userNameTest);
    this.namePrincipalRoom = participant.roomName;
  };


  getParticipants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.api.getParticipantsInfo());
      }, 500);
    });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }
}
