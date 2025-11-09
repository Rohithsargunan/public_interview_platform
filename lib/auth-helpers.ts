import { NextRequest } from "next/server";
import { supabase } from "./supabase";

export async function getAuthenticatedUser(request: NextRequest) {
  if (!supabase) {
    throw new Error("Supabase not configured");
  }

  // Get the authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No authorization token provided");
  }

  const token = authHeader.substring(7);

  try {
    // Verify the JWT token and get user
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new Error("Invalid or expired token");
    }

    return user;
  } catch (error) {
    console.error("Auth error:", error);
    throw new Error("Authentication failed");
  }
}

// Alternative method that doesn't require Authorization header
export async function getUserFromSession(request: NextRequest) {
  if (!supabase) {
    return null;
  }

  try {
    // Try to get user from current session
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}