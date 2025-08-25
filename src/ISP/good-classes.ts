// ✅ ХОРОШО: Соблюдение ISP - тонкие интерфейсы, которые содержат только нужные методы
//
// ПРЕИМУЩЕСТВА:
// 1. Тонкие интерфейсы - содержат только необходимые методы
// 2. Добровольная реализация - классы реализуют только нужные интерфейсы
// 3. Соблюдение принципа единственной ответственности - каждый интерфейс отвечает за одну область
// 4. Легкость тестирования - тестируем только нужные методы
// 5. Гибкость - классы могут реализовывать только нужные интерфейсы

// ✅ ISP: Базовый интерфейс для всех фигур - только основные методы
interface Shape {
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
}


//Расширенный интерфейс для круга
interface CircleShape extends Shape {
    getDiametr(): number;
}

//Расширенный интерфейс для прямоугольника
interface RectangleShape extends Shape {
    getDiagonal(): number;
}

class Circle implements CircleShape {
    constructor(private radius: number) {}

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }

    getInfo(): string {
        return `Circle: radius=${this.radius}`;
    }

    getDiametr() {
       return this.radius * 2;
    }
}

class Rectangle implements RectangleShape {
    constructor(private width: number, private height: number) {}

    getArea() {
        return this.width * this.height;
    }

    getPerimeter() {
        return 2 * (this.width + this.height);
    }

    getInfo() {
        return `Rectangle: ${this.width}x${this.height}`;
    }

    getDiagonal() {
        return Math.sqrt(this.width * this.width + this.height * this.height);
    }

}

// Применение 1   ✅ ISP: Фабричные функции создают объекты только с нужными методами
class IspGoodCreateShapeFactory {
     static getCircleData(radius: number) {
        const circle = new Circle(radius);
        return {
            area: circle.getArea(),
            perimeter: circle.getPerimeter(),
            info: circle.getInfo(),
            diameter: circle.getDiametr(),
        };
    }

    static getRectangleData(width: number, height: number) {
        const rectangle = new Rectangle(width, height);
        return {
            area: rectangle.getArea(),
            perimeter: rectangle.getPerimeter(),
            info: rectangle.getInfo(),
            diagonal: rectangle.getDiagonal(),
        };
    }
}


const ispGoodCircleData1 = IspGoodCreateShapeFactory.getCircleData(10);
const ispGoodRectangleData1 = IspGoodCreateShapeFactory.getRectangleData(4, 6);

export {}





