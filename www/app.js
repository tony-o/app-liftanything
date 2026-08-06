const be = 'https://liftanything.friedliver.com';
const liftanything = {
  login: async (email, password) => {
    const r = await (await fetch(`${be}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email, password
      }),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    localStorage.setItem('udata', JSON.stringify(r.data));
    return r.data;
  },
  register: async (name, email, password) => {
    const r = await (await fetch(`${be}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name, email, password
      }),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    localStorage.setItem('udata', JSON.stringify(r.data));
    return r.data;
  },
  logout: async () => {
    localStorage.removeItem('udata');
  },
  get_current_session: async () => {
    const udata = JSON.parse(localStorage.getItem('udata'));
    if(udata.expires < Math.floor(Date.now()/1000)){
      liftanything.logout();
      return undefined;
    }
    return udata;
  },

  // --- Settings ---
  get_settings: async () => {
    const r = await (await fetch(`${be}/api/users/settings`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  update_settings: async (settings) => {
    const r = await (await fetch(`${be}/api/users/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
      body: JSON.stringify(settings),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },

  // --- Feed / Sessions ---
  get_feed: async (page) => {
    const r = await (await fetch(`${be}/api/feed/${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  get_my_sessions: async (page) => {
    const r = await (await fetch(`${be}/api/feed/${page}?me=1`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  get_session_detail: async (session_id) => {
    const r = await (await fetch(`${be}/api/feed/detail/${session_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  create_session: async (session) => {
    const r = await (await fetch(`${be}/api/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
      body: JSON.stringify(session),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  toggle_kudos: async (session_id) => {
    const r = await (await fetch(`${be}/api/feed/kudos/${session_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },

  // --- Templates / Workouts ---
  get_templates: async () => {
    const r = await (await fetch(`${be}/api/workouts`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  create_template: async (template) => {
    const r = await (await fetch(`${be}/api/workouts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
      body: JSON.stringify(template),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  update_template: async (template_id, template) => {
    const r = await (await fetch(`${be}/api/workouts/${template_id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
      body: JSON.stringify(template),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  delete_template: async (template_id) => {
    const r = await (await fetch(`${be}/api/workouts/${template_id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return {id: template_id, deleted: true};
  },

  // --- Exercise Library ---
  get_exercise_library: async () => {
    const r = await (await fetch(`${be}/api/exercises`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
  create_custom_exercise: async (exercise) => {
    const r = await (await fetch(`${be}/api/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': JSON.parse(localStorage.getItem('udata')).token,
      },
      body: JSON.stringify(exercise),
    })).json();
    if (!r.success) {
      throw r.error || "There was a problem, try again in a few minutes";
    }
    return r.data;
  },
};
