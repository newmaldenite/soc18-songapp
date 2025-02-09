
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const postVideo = async (formData) => {
  const { data, error } = await supabase
    .from('videos')
    .insert([formData])
    .select();
  
  if (error) throw error;
  return data[0];
};