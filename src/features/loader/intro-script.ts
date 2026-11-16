/**
 * Runs in <head> before first paint: the loader shows once per browser session.
 * Later loads in the same session get `data-intro-seen` on <html>, which hides it.
 */
export const INTRO_SEEN_SCRIPT = `try{var k="mh-intro-seen",d=document.documentElement;if(sessionStorage.getItem(k))d.setAttribute("data-intro-seen","");else sessionStorage.setItem(k,"1")}catch(e){}`;
