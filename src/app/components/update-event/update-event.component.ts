import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  eventForm: FormGroup;
  eventId: number;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
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

    this.eventId = this.route.snapshot.params['id']; // Get event ID from route
  }

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent(): void {
    this.eventService.getEvent(this.eventId).subscribe(
      (event: Event) => {
        this.eventForm.patchValue(event);
      },
      (error) => {
        console.error('Error loading event', error); // Handle error (e.g., display error message)
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const eventData: Event = {
        ...this.eventForm.value,
        id: this.eventId // Include the id from the component property

      };

      this.eventService.updateEvent(this.eventId, eventData).subscribe(
        (response) => {
          console.log('Event updated successfully', response);
          this.router.navigate(['/dashboard']); // Redirect to calendar after successful update
        },
        (error) => {
          console.error('Error updating event', error);
          // Handle error (e.g., display error message)
        }
      );
    }
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.eventId).subscribe(
        () => {
          console.log('Event deleted successfully');
          this.router.navigate(['/dashboard']); // Redirect to calendar after deletion
        },
        (error) => {
          console.error('Error deleting event', error);
          // Handle error (e.g., display error message)
        }
      );
    }
  }


  onCancel(): void {
    this.router.navigate(['/dashboard']); // Navigate back to calendar without updating event
  }
}
