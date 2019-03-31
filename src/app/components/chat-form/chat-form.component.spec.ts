import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFormComponent } from './chat-form.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { RdfService } from '../../services/rdf.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';

describe('ChatFormComponent', () => {
    let component: ChatFormComponent;
    let fixture: ComponentFixture<ChatFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChatFormComponent],
            imports: [ FormsModule , ToastrModule.forRoot() ],
            providers: [ 
                { provide: ChatService, useClass: ChatService }
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(ChatFormComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Send message', () => {
        it('calls the component send function', async(() => {
            spyOn(component, "send");
            component.message = "Hello from chat form test";
            component.send();
            expect(component.send).toHaveBeenCalledTimes(1);
        }));

        it('calls the service send function', async(() => {
            const chatService: ChatService = fixture.debugElement.injector.get(ChatService);
            spyOn(chatService, "sendMessage");
            component.message = "Hello from chat form test to chat service";
            component.send();
            expect(chatService.sendMessage).toHaveBeenCalledTimes(1);
        }));
    });

    describe('Notifications daemon', () => {
        let chatService: ChatService;

        beforeEach(async(() => {
            chatService = fixture.debugElement.injector.get(ChatService);
        }));

        it('calls the service start function', async(() => {
            spyOn(chatService, "startNotificationsDaemon");
            component.start();
            expect(chatService.startNotificationsDaemon).toHaveBeenCalledTimes(1);
        }));

        it('calls the service stop function', () => {
            spyOn(chatService, "stopNotificationsDaemon");
            component.stop();
            expect(chatService.stopNotificationsDaemon).toHaveBeenCalledTimes(1);
        });
    });

    it('send button should call the send function', async(() => {
        spyOn(component, "send");
        let button = fixture.debugElement.query(By.css('#send')).nativeElement;
        component.message = "Hello";
        button.click();
        expect(component.send).toHaveBeenCalledTimes(1);
    }));
});