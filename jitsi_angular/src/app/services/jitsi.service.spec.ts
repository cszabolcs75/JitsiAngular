import { TestBed } from '@angular/core/testing';
import { JitsiService } from './jitsi.service';


describe('JitsiService', () => {
  let service: JitsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JitsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should handle text message received', async () => {
    const eventData = { text: 'mover a principal' };
    const event = { data: { eventData: eventData } };
    const moveRoomSpy = spyOn(service, 'moveRoom');
    
    await service.endpointTextMessageReceived(event);

    expect(moveRoomSpy).toHaveBeenCalledWith('channel 1');
  });

  it('should handle participant left event', async () => {
    const getParticipantsSpy = spyOn(service, 'getParticipants').and.returnValue(Promise.resolve([{ name: 'John' }, { name: 'Doe' }]));

    await service.handleParticipantLeft('John');

    expect(getParticipantsSpy).toHaveBeenCalled();
  });
});
