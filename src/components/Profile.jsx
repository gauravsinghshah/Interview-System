import React, { useState, useEffect } from "react";
import StudentNav from "./StudentNav";

const Profile = () => {
  const [profile, setProfile] = useState({
    bio: "",
    skills: "",
    resumeUrl: "",
    githubUrl: "",
    experience: "0 Yrs"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    fetch("http://localhost:5000/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile({
          ...data,
          skills: data.skills ? data.skills.join(", ") : ""
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile", err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...profile,
          skills: profile.skills.split(",").map(s => s.trim()).filter(s => s)
        })
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving profile");
    }
  };

  return (
    <div className="min-h-screen w-full border-y-2 border-black bg-[#f2efe9] text-black font-sans">
      <StudentNav />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="mb-8 text-4xl font-black uppercase md:text-5xl border-b-4 border-black pb-4 inline-block">
          Your Profile
        </h1>
        {loading ? <p className="font-bold uppercase tracking-widest">Loading...</p> : (
          <form onSubmit={handleSave} className="space-y-6 bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <label className="block uppercase text-sm font-black mb-2">Bio</label>
              <textarea 
                className="w-full border-2 border-black p-3 font-semibold" 
                rows="4"
                value={profile.bio || ""}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            <div>
              <label className="block uppercase text-sm font-black mb-2">Skills (comma separated)</label>
              <input 
                type="text" 
                className="w-full border-2 border-black p-3 font-semibold"
                value={profile.skills || ""}
                onChange={(e) => setProfile({...profile, skills: e.target.value})}
                placeholder="React, Node.js, Python"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block uppercase text-sm font-black mb-2">Experience</label>
                <input 
                  type="text" 
                  className="w-full border-2 border-black p-3 font-semibold"
                  value={profile.experience || ""}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                  placeholder="e.g. 2 Yrs"
                />
              </div>
              <div>
                <label className="block uppercase text-sm font-black mb-2">GitHub URL</label>
                <input 
                  type="text" 
                  className="w-full border-2 border-black p-3 font-semibold"
                  value={profile.githubUrl || ""}
                  onChange={(e) => setProfile({...profile, githubUrl: e.target.value})}
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>
            <div>
              <label className="block uppercase text-sm font-black mb-2">Resume URL</label>
              <input 
                type="text" 
                className="w-full border-2 border-black p-3 font-semibold"
                value={profile.resumeUrl || ""}
                onChange={(e) => setProfile({...profile, resumeUrl: e.target.value})}
                placeholder="Link to Google Drive or Portfolio"
              />
            </div>
            <button type="submit" className="w-full bg-[#1800ff] text-white font-black uppercase tracking-widest py-4 border-2 border-black hover:bg-black transition-colors cursor-pointer mt-4">
              Save Profile
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default Profile;
