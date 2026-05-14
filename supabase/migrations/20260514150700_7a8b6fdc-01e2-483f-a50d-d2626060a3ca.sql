
CREATE TABLE public.survey_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT,
  company TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX survey_signups_email_key ON public.survey_signups (lower(email));

ALTER TABLE public.survey_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up"
  ON public.survey_signups FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
