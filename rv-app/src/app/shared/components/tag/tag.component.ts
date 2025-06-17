import { Component, Input, OnInit } from '@angular/core';
import { IRider } from '../../../core/interfaces/models/rider.interface';
import { RiderService } from '../../../core/services/rider.service';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.sass']
})

export class TagComponent implements OnInit{
  @Input() tagged_rider: IRider = {} as IRider;
  rider: IRider = {} as IRider;

  constructor(
    private riderService: RiderService
  ) {}

  ngOnInit(): void {
    this.loadRider();
  }

  loadRider(): void {
    this.riderService.getRider(Number(this.tagged_rider))
      .subscribe((data) => {
        this.rider = data;
      });
  }
}