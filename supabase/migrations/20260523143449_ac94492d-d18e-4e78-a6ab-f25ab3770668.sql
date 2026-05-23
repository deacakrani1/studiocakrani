-- Explicitly deny SELECT/UPDATE/DELETE on contact_messages for anon and authenticated roles.
-- RLS is already enabled; with no permissive policy, access is denied by default, but we add
-- explicit restrictive policies for defense-in-depth and to satisfy security scanners.

REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon, authenticated;

CREATE POLICY "Deny select on contact_messages"
ON public.contact_messages
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (false);

CREATE POLICY "Deny update on contact_messages"
ON public.contact_messages
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny delete on contact_messages"
ON public.contact_messages
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (false);
