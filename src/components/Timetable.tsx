type Session = {
  weekday: number
  start_time: string
  end_time: string
  class_id?: string
  trainer_id?: string
}

type TimetableProps = {
  sessions: Session[]
}

export default function Timetable({ sessions }: TimetableProps) {
  return (
    <div className="grid gap-3">
      {sessions.map((s) => (
        <div key={s.start_time} className="card p-3">
          <p className="text-white font-medium">
            Day {s.weekday}: {s.start_time} - {s.end_time}
          </p>
        </div>
      ))}
    </div>
  )
}
