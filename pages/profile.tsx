// pages/profile.tsx

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import Cropper from "react-easy-crop";
import getCroppedImg from "../lib/cropImage";

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState<any[]>([]);

  const [actionSheet, setActionSheet] = useState(false);
  const [cropMode, setCropMode] = useState(false);

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploading, setUploading] = useState(false);

  // ABOUT ME
  const [editAboutMe, setEditAboutMe] = useState(false);
  const [aboutMeTemp, setAboutMeTemp] = useState("");

  const defaultAvatar = "/default-avatar.png";

  // Load profile
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push("/auth/login");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setAboutMeTemp(data.about_me || "");
      // Load earned badges
const { data: badgeData } = await supabase
  .from("badges")
  .select("*")
  .eq("user_id", user.id);

setBadges(badgeData || []);

      setLoading(false);
    };

    load();
    
  }, []);

  const onSelectFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoSrc(reader.result as string);
      setCropMode(true);
      setActionSheet(false);
    };
    reader.readAsDataURL(file);
  };

  const uploadCroppedImage = async () => {
    if (!photoSrc) return;

    setUploading(true);

    const file = await getCroppedImg(photoSrc!, crop, zoom);

    const { data: { user } } = await supabase.auth.getUser();

    const filePath = `profile-${user.id}-${Date.now()}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);

    await supabase
      .from("profiles")
      .update({ profile_photo: urlData.publicUrl })
      .eq("id", user.id);

    setProfile((p: any) => ({ ...p, profile_photo: urlData.publicUrl }));
    setCropMode(false);
    setUploading(false);
  };

  const removePhoto = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase
      .from("profiles")
      .update({ profile_photo: null })
      .eq("id", user.id);

    setProfile((p: any) => ({ ...p, profile_photo: null }));
    setActionSheet(false);
  };

  const saveAboutMe = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    await supabase
      .from("profiles")
      .update({ about_me: aboutMeTemp })
      .eq("id", user.id);

    setProfile((p: any) => ({ ...p, about_me: aboutMeTemp }));
    setEditAboutMe(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  const photo = profile?.profile_photo || defaultAvatar;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071027] via-[#0e1423] to-black text-white px-6 relative">

      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white backdrop-blur-xl"
      >
        ← Back
      </button>

      <div className="relative z-10 pt-28 max-w-3xl mx-auto flex flex-col items-center">

        {/* PROFILE PHOTO */}
        <div
          className="w-36 h-36 rounded-full overflow-hidden border border-white/30 shadow-xl cursor-pointer"
          onClick={() => setActionSheet(true)}
        >
          <img src={photo} className="w-full h-full object-cover rounded-full" />
        </div>

        {/* NAME */}
        <h1 className="text-3xl font-bold mt-4">
          {profile?.full_name || "No Name"}
        </h1>

        {/* USERNAME */}
        <p className="text-white/60">
          @{profile?.username || "unknown"}
        </p>

        {/* DETAILS CARD */}
        <div className="mt-10 w-full bg-white/10 p-6 border border-white/20 rounded-2xl backdrop-blur-xl">

          <h2 className="text-xl font-bold mb-3">Details</h2>

          <p><b>Email:</b> {profile?.email || "Not provided"}</p>
          <p className="mt-1"><b>Mobile:</b> {profile?.mobile || "Not provided"}</p>
          <p className="mt-1"><b>Goal:</b> {profile?.goal || "Not set"}</p>

          {/* ABOUT ME */}
          <h3 className="text-xl font-bold mt-6 mb-2">About Me</h3>

          <p className="text-white/80">
            {profile?.about_me || "No bio added yet."}
          </p>

          <button
            onClick={() => setEditAboutMe(true)}
            className="mt-3 px-4 py-2 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20"
          >
            Edit About Me
          </button>

          {/* SKILLS */}
          <h3 className="text-xl font-bold mt-6 mb-3">Skills</h3>

          <div className="flex flex-wrap gap-2">
            {/* BADGES */}
<h3 className="text-xl font-bold mt-10 mb-3">Badges</h3>

{badges.length === 0 ? (
  <div className="text-white/60 bg-white/5 p-4 rounded-xl border border-white/10">
    No badges earned yet.
  </div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
    {badges.map((badge: any) => (
      <div
        key={badge.id}
        className="bg-white/10 p-4 border border-white/20 rounded-xl backdrop-blur-xl flex items-center gap-4"
      >
        <img
          src={badge.image_url}
          className="w-16 h-16 rounded-xl object-cover"
        />

        <div>
          <h4 className="text-lg font-semibold">{badge.title}</h4>
          <p className="text-white/60 text-sm">{badge.skill}</p>

          {badge.tx_hash && (
            <p className="text-xs text-white/40 mt-1 break-all">
              Tx: {badge.tx_hash}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
)}

            {(profile?.skills || []).map((sk: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION SHEET */}
      {actionSheet && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-end pb-10"
          onClick={() => setActionSheet(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-xl w-80 p-4 rounded-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Choose Photo */}
            <label className="block text-center py-3 border-b border-white/10 cursor-pointer hover:bg-white/10">
              📁 Choose Photo
              <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
            </label>

            {/* Remove Photo */}
            <p
              className="text-red-400 py-3 border-b border-white/10 cursor-pointer hover:bg-white/10"
              onClick={removePhoto}
            >
              🗑 Remove Photo
            </p>

            {/* Cancel */}
            <p className="py-3 text-white/70 cursor-pointer" onClick={() => setActionSheet(false)}>
              Cancel
            </p>
          </div>
        </div>
      )}

      {/* EDIT ABOUT ME MODAL */}
      {editAboutMe && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit About Me</h2>

            <textarea
              className="w-full h-32 p-3 bg-white/10 border border-white/20 rounded-xl text-white"
              value={aboutMeTemp}
              onChange={(e) => setAboutMeTemp(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl"
                onClick={() => setEditAboutMe(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-gradient-to-r from-[#6366f1] to-[#00d4ff] rounded-xl"
                onClick={saveAboutMe}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CROP MODAL */}
      {cropMode && (
        <div className="fixed inset-0 bg-black/85 flex flex-col items-center justify-center px-4 z-[9999]">

          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-[9998]"></div>

          {/* crop container */}
          <div className="relative w-full max-w-md h-[350px] bg-black rounded-xl overflow-hidden z-[9999]">
            <Cropper
              image={photoSrc!}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
          </div>

          {/* buttons */}
          <div className="flex gap-4 mt-6 w-full max-w-md z-[9999]">
            <button
              className="flex-1 py-2 bg-white/10 border border-white/20 rounded-xl"
              onClick={() => setCropMode(false)}
            >
              Cancel
            </button>

            <button
              className="flex-1 py-2 bg-gradient-to-r from-[#6366f1] to-[#00d4ff] rounded-xl"
              onClick={uploadCroppedImage}
            >
              {uploading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
