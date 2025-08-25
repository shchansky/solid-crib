// ❌ ПЛОХО: Нарушение ISP - функции работают с толстыми типами, содержащими ненужные методы
//
// ПРОБЛЕМЫ:
// 1. Толстые типы - содержат слишком много методов
// 2. Принудительная зависимость - функции зависят от ненужных методов
// 3. Нарушение принципа единственной ответственности - функции знают о слишком многом
// 4. Сложность тестирования - нужно создавать объекты со всеми методами
// 5. Нарушение принципа подстановки - функции могут случайно вызвать ненужные методы

// ❌ НАРУШЕНИЕ ISP: Толстый тип для фигуры, который содержит все возможные методы
type Shape = {
    // Основные методы для всех фигур
    getArea(): number;
    getPerimeter(): number;
    getInfo(): string;
    
    // Метод подходит только для круга
    getDiametr(): number;

    // Метод подходит только для прямоугольника
    getDiagonal(): number;
};

// ❌ НАРУШЕНИЕ ISP: Фабричные функции создают объекты с ненужными методами
function createCircle(radius: number): Shape {
    return {
        
        getArea: () => Math.PI * radius * radius,
        getPerimeter: () => 2 * Math.PI * radius,
        getInfo: () => `Circle: radius=${radius}`,
        getDiametr: () => radius * 2, 
        // ❌ ПРОБЛЕМА: Круг должен реализовывать методы, которые ему не нужны
        getDiagonal: () => 0, // Пустая реализация
    };
}

function createRectangle(width: number, height: number): Shape {
    return {
        getArea: () => width * height,
        getPerimeter: () => 2 * (width + height),
        getInfo: () => `Rectangle: ${width}x${height}`,
        getDiametr: () => 0, 
         // ❌ ПРОБЛЕМА: Прямоугольник должен реализовывать методы, которые ему не нужны
        getDiagonal: () => Math.sqrt(width * width + height * height),

    };
}

//Применение

const createShapeFactory = {
    // Фабричная функция для круга
    circle: (radius: number) => {
        const circle = createCircle(radius);
        return {
            area: circle.getArea(),
            perimeter: circle.getPerimeter(),
            info: circle.getInfo(),
            diameter: circle.getDiametr(),
            diagonal: circle.getDiagonal(), // ❌ Ненужное поле для круга
        };
    },
    
    // Фабричная функция для прямоугольника
    rectangle: (width: number, height: number) => {
        const rectangle = createRectangle(width, height);
        return {
            area: rectangle.getArea(),
            perimeter: rectangle.getPerimeter(),
            info: rectangle.getInfo(),
            diameter: rectangle.getDiametr(), // ❌ Ненужное поле для прямоугольника
            diagonal: rectangle.getDiagonal(),
        };
    }
};

const badCircleData = createShapeFactory.circle(10);
const badRectangleData = createShapeFactory.rectangle(4, 6);

export {}
