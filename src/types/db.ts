export type Trainer = {
  id: string
  name: string
  role: string
  bio_short?: string | null
  bio_long?: string | null
  photo_url?: string | null
  specialties?: string[] | null
  is_active?: boolean | null
}

export type GymClass = {
  id: string
  title: string
  category: 'strength' | 'cardio' | 'yoga' | 'crossfit' | 'zumba' | 'mobility'
  level?: string | null
  duration_min?: number | null
  description?: string | null
  cover_url?: string | null
  is_active?: boolean | null
}

export type ClassSession = {
  id: string
  class_id: string
  trainer_id: string | null
  weekday: number
  start_time: string
  end_time: string
  capacity?: number | null
  is_active?: boolean | null
  class?: Pick<GymClass, 'title'>
  trainer?: Pick<Trainer, 'name'>
}
