import { useEffect, useState } from "react";
import { CategoryList } from "../shared/components/Category/Category";
import { RestaurantRecommendations } from "../shared/components/RestaurantRecommendations";
import { Restaurant } from "../entities/restaurant";
import "./MainPage.css"; // Pentru stiluri
import { Header } from "../shared/components/Header/Header";
import { Container } from "../shared/components/Container/Container";

const mockRecommendations: Restaurant[] = [
  { id: 1, name: "McDonald's", category: "Burger", image: "/path/to/image1" },
  { id: 2, name: "Andy's", category: "Traditional", image: "/path/to/image2" },
  { id: 3, name: "Mr Kebab", category: "Kebab", image: "/path/to/image3" },
];

export const MainPage = () => {
  const [recommendations, setRecommendations] = useState<Restaurant[]>([]);

  useEffect(() => {
    setRecommendations(mockRecommendations); // Simulăm datele
  }, []);

  return (
    <div className="main-page">
      <Header/>
        <CategoryList />
        <Container>
          <>
            <section className="recommendations-section">
          <h2>Recomandam</h2>
          <RestaurantRecommendations recommendations={recommendations} />
         </section>

          <section className="about-us">
         <h2>About Us</h2>
         <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          </section>
          </>
        </Container>

      

      <footer className="footer">
        <div className="footer-content">
          <img src="/path/to/logo" alt="Logo" className="footer-logo" />
          <div className="contacts">
            <p>+373 9999999991</p>
            <p>mail@mail.com</p>
            <p>instagram.com</p>
          </div>
          <p>©Copyright 2024</p>
        </div>
      </footer>
    </div>
  );
};
