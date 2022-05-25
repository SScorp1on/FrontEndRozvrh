import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeblockModel} from "../../admin-dashboard/components/models/timeblock.model";
import {TimeblockService} from "../../admin-dashboard/components/services/timeblock.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Day} from "../../admin-dashboard/components/models/day.model";
import {Subject, takeUntil} from "rxjs";
import {TeacherService} from "../../admin-dashboard/components/services/teacher.service";
import {SubjectService} from "../../admin-dashboard/components/services/subject.service";
import {ClassroomService} from "../../admin-dashboard/components/services/classroom.service";
import {Time} from "@angular/common";
import {GroupService} from "../../admin-dashboard/components/services/group.service";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit, OnDestroy {
  form: FormGroup;
  days: Day[] = [0,1,2,3,4]
  timeblocks: TimeblockModel[] = []
  destroy$ = new Subject()
  sortedArray: any
  constructor(private service: TimeblockService,
              private teacherService: TeacherService,
              private subjectService: SubjectService,
              private classroomService: ClassroomService,
              private groupService: GroupService) {
    this.form = new FormGroup({
      select1: this.selectControl,
      select2: this.objectControl
    })
  }

  selectList1 = [{key: 'group', value:'Skupina'}, {key:'classroom', value:'Učebňa'}, {key: 'subject', value:'Predmet'}, {key: 'teacher', value:'Učiteľ'}]
  selectedList : TimeblockModel[] = []
  selectList2: any[] = []
  selectControl = new FormControl('group')
  objectControl = new FormControl('')

getObject(object: string){
    switch (object) {
      case "group": {
        this.groupService.getGroups().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.selectList2 = data
          console.log(this.selectList2)
         this.form.get('select2')?.setValue(data[0].name)
          this.onSubmit()
        })
        break
      }
      case "teacher": {
         this.teacherService.getTeachers().pipe(takeUntil(this.destroy$)).subscribe((data: any) =>{
           this.selectList2 = data
           console.log(this.selectList2)
           this.form.get('select2')?.setValue(data[0].firstName + ' ' + data[0].lastName)
           console.log(data[0].firstName + ' ' + data[0].lastName)
           this.onSubmit()
        })

        break
      }
      case "subject":{
         this.subjectService.getSubjects().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
           this.selectList2 = data
           console.log(this.selectList2)
           this.form.get('select2')?.setValue(data[0].name)
           this.onSubmit()
         })

        break
      }
      case "classroom": {
         this.classroomService.getClassrooms().pipe(takeUntil(this.destroy$)).subscribe((data: any) =>{
           this.selectList2 = data
           console.log(this.selectList2)
           this.form.get('select2')?.setValue(data[0].name)
           this.onSubmit()
        })
        break
      }
    }
    console.log(this.selectList2)
   // this.objectControl =
  //   this.selectList2 = this.service.getTimeBlocksBySelectWithoutName(object).pipe()
}
  f: {"0": TimeblockModel[],"1": TimeblockModel[],"2": TimeblockModel[],"3": TimeblockModel[],"4": TimeblockModel[]} = {
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
  }
 filtered: {start: Time, finish: Time}[] = [];
  onSubmit(){
    this.filtered.length = 0
    this.f = {
      "0": [],
      "1": [],
      "2": [],
      "3": [],
      "4": [],
    };
    console.log(this.form.value.select1, this.form.value.select2)
    this.service.getTimeBlocksBySelect(this.form.value.select1, this.form.value.select2).pipe(takeUntil(this.destroy$)).subscribe( (data: TimeblockModel[] ) => {
      if(data.length != 0){
      this.filtered.length = 0
      const was: string[] = [];
      for (const d of data) {
        if (!was.includes(`${d.start}|${d.finish}`)) {
          was.push(`${d.start}|${d.finish}`);
          this.filtered.push({start: d.start, finish: d.finish});
          this.filtered.sort((a, b) => {
            if(a.start < b.start){
              return -1
            }
            if(a.start > b.start){
              return 1
            }
            return 0
          })
        }
        }

        this.timeblocks = data

            for (const a of data) this.f[a.day].push(a);
            console.log(this.f)
          }

      function daySort(a: TimeblockModel, b: TimeblockModel) {

        const numA = a.start.hours + (a.start.minutes/60); // 9:50 -> 9.8
        const numB = b.start.hours + (b.start.minutes/60);
        return numA - numB;
      }

      this.f["0"].sort((a,b) => daySort(a,b));
      this.f["1"].sort((a,b) => daySort(a,b));
      this.f["2"].sort((a,b) => daySort(a,b));
      this.f["3"].sort((a,b) => daySort(a,b));
      this.f["4"].sort((a,b) => daySort(a,b));

        console.log("Новый список")
        console.log(this.f)

        console.log(this.filtered)


    })
  }
  ngOnInit(): void {
    this.timeblocks = this.timeblocks.slice();
    this.service.getTimeblocks().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.timeblocks = data
    })
    this.getObject(this.selectControl.value)
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }


}
