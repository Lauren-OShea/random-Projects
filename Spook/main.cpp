//Lauren O'Shea
//first simple game. 

#ifdef _DEBUG 
#pragma comment(lib,"sfml-graphics-d.lib") 
#pragma comment(lib,"sfml-audio-d.lib") 
#pragma comment(lib,"sfml-system-d.lib") 
#pragma comment(lib,"sfml-window-d.lib") 
#pragma comment(lib,"sfml-network-d.lib") 
#else 
#pragma comment(lib,"sfml-graphics.lib") 
#pragma comment(lib,"sfml-audio.lib") 
#pragma comment(lib,"sfml-system.lib") 
#pragma comment(lib,"sfml-window.lib") 
#pragma comment(lib,"sfml-network.lib") 
#endif 

#include <SFML/Graphics.hpp>
#include <iostream>
#include <stdlib.h> 
#include <time.h> 

sf::RectangleShape ghost;
float width = 30;
float height = 30;

float xPosition = rand() % 800;
float yPosition = rand() % 200;



float posX;
float posY;
float speed = 1;
bool spacePressed = false;
bool spook = false;

int main()
{

	sf::RenderWindow window(sf::VideoMode({ 1200, 700 }), "SPOOK");

	
	ghost.setSize(sf::Vector2f(width, height));

	ghost.setFillColor(sf::Color::White);

	ghost.setPosition({xPosition, yPosition});

	


	srand(time(NULL));

	const int numCircles = 10;
	sf::CircleShape circles[numCircles];

	for (int index = 0; index < numCircles; index++)
	{
		float xmPos = rand() % 1200;
		float ymPos = rand() % 700;

		circles[index].setFillColor(sf::Color::White);
		circles[index].setRadius(10);
		circles[index].setPosition(sf::Vector2f(xmPos, ymPos));
	}

	


	

	sf::Time timePerFrame = sf::seconds(1.0f / 60.0f);

	sf::Time timeSinceLastUpdate = sf::Time::Zero;


	sf::Clock clockForFrameRate;

	clockForFrameRate.restart();

	while (window.isOpen())
	{

		//sf::Event event;
		while (const std::optional event = window.pollEvent())
		{
			if (event ->is < sf::Event::Closed>())
				window.close();
		}


		timeSinceLastUpdate += clockForFrameRate.restart();


		if (timeSinceLastUpdate > timePerFrame)
		{
			

			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Key::Space))
			{
				spook = true;
				std::cout << "SPOOK!! " << std::endl;
				
			}
			posX = ghost.getPosition().x;
			posY = ghost.getPosition().y;

			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Key::W))//up
			{
				ghost.setPosition({ posX , posY - 10 });
				std::cout << "up" << std::endl;
			}
			else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Key::A))//left
			{
				
				ghost.setPosition({ posX - 10, posY });
				std::cout << "left" << std::endl;
			}
			else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Key::S))//down
			{
				ghost.setPosition({ posX , posY + 10 });
				std::cout << "down" << std::endl;
			}
			else if (sf::Keyboard::isKeyPressed(sf::Keyboard::Key::D)) //right
			{
				ghost.setPosition({ posX + 10, posY });
				std::cout << "right" << std::endl;
			}

			
			if (ghost.getPosition().x <= -30)
			{
				xPosition = 1199;
				ghost.setPosition({ xPosition, yPosition });
			}
			if (ghost.getPosition().x + width >= 1230)
			{
				xPosition = 0;
				ghost.setPosition({ xPosition, yPosition });
			}

			if (ghost.getPosition().y <= -30)
			{
				yPosition = 699;
				ghost.setPosition({ xPosition, yPosition });
			}
			if (ghost.getPosition().y + height >= 730)
			{
				yPosition = 0;
				ghost.setPosition({ xPosition, yPosition });
			}



			for (int index = 0; index < numCircles; index++)
			{
				if (ghost.getGlobalBounds().findIntersection(circles[index].getGlobalBounds()) && spook)
				{
					circles[index].setPosition({1000, 1000});

				}
				
			}
			

			window.clear();

			//draw objects
				for (int index = 0; index < numCircles; index++)
				{

					window.draw(circles[index]);

				}
				window.draw(ghost);
			
			
			window.display();


			timeSinceLastUpdate = sf::Time::Zero;
		}
	}



	return 0;
}

