import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: [''],
      status: [1, Validators.required],
      backgroundColor: [''],
      borderColor: [''],
      textColor: ['']
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData: Event = this.eventForm.value;
      this.eventService.createEvent(eventData).subscribe(
        (response) => {
          console.log('Event created successfully', response);
          this.router.navigate(['/dashboard']); // Redirect to calendar after successful creation
        },
        (error) => {
          console.error('Error creating event', error);
          // Handle error (e.g., display error message)
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']); // Navigate back to calendar without creating event
  }
}
