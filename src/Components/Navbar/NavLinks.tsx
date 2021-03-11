import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <ul className="navlinks">
      <li>
        <NavLink to="signup" activeClassName="active">
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink to="signin" activeClassName="active">
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink to="about" activeClassName="active">
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="products" activeClassName="active">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
      </li>
    </ul>
  );
}
