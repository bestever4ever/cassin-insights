
-- Confirm the owner's email so they can sign in
UPDATE auth.users
SET email_confirmed_at = COALESCE(email_confirmed_at, now())
WHERE id = '2bbf0274-afa5-4faa-ab07-ca5e1364039e';

-- Grant admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('2bbf0274-afa5-4faa-ab07-ca5e1364039e', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
