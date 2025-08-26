// ❌ ПЛОХО: Нарушение SRP - один класс делает всё для всех фигур
//
// 📋 НАРУШЕНИЕ ОСНОВНОЙ ИДЕИ SRP:
// 1. ❌ МНОЖЕСТВЕННЫЕ ОТВЕТСТВЕННОСТИ - класс знает о всех типах фигур
// 2. ❌ СМЕШАННАЯ ЛОГИКА - валидация, расчеты, обработка ошибок в одном методе
// 3. ❌ НЕЧЕТКИЕ ГРАНИЦЫ - класс делает слишком много разных вещей
// 4. ❌ СЛОЖНОСТЬ ИЗМЕНЕНИЯ - изменение одной фигуры влияет на весь класс
// 5. ❌ СЛОЖНОСТЬ ТЕСТИРОВАНИЯ - нужно тестировать всю логику сразу
//
// ПРОБЛЕМЫ:
// 1. Один класс отвечает за все типы фигур
// 2. Один метод делает валидацию, расчеты и обработку ошибок
// 3. Сложность добавления новых фигур
// 4. Сложность тестирования отдельных компонентов
// 5. Нарушение принципа единственной ответственности

// ❌ НАРУШЕНИЕ SRP: Класс с множественными ответственностями
// 💡 ЧТО НЕ ТАК: Класс знает о всех типах фигур и делает всё для них
// 🎯 КАК ИСПРАВИТЬ: Разделить на отдельные классы для каждой фигуры
class ShapeProcessor {
    radius?: number;
    width?: number;
    height?: number;

    constructor(radius?: number, width?: number, height?: number) {
        this.radius = radius;
        this.width = width;
        this.height = height;
    }

    // ❌ НАРУШЕНИЕ SRP: Плохой метод - делает всё для всех фигур
    // 💡 ПРОБЛЕМЫ:
    //    - Валидация разных типов фигур
    //    - Расчеты для разных типов фигур
    //    - Обработка ошибок для разных типов фигур
    //    - Смешанная логика в одном методе
    // 🎯 РЕШЕНИЕ: Разделить на отдельные методы и классы
    processShape(shapeType: 'circle' | 'rectangle'): {area: number, perimeter: number} {
        if (shapeType === 'circle') {
            // ❌ ОТВЕТСТВЕННОСТЬ 1: Валидация круга
            if (!this.radius || this.radius <= 0) {
                throw new Error('Invalid circle radius');
            }

            // ❌ ОТВЕТСТВЕННОСТЬ 2: Расчет площади круга
            const area = Math.PI * this.radius * this.radius;
            
            // ❌ ОТВЕТСТВЕННОСТЬ 3: Расчет периметра круга
            const perimeter = 2 * Math.PI * this.radius; 

            return {area, perimeter};

        } else if (shapeType === 'rectangle') {
            // ❌ ОТВЕТСТВЕННОСТЬ 1: Валидация прямоугольника
            if (!this.width || !this.height || this.width <= 0 || this.height <= 0) {
                throw new Error('Invalid rectangle dimensions');
            }

            // ❌ ОТВЕТСТВЕННОСТЬ 2: Расчет площади прямоугольника
            const area = this.width * this.height;
            
            // ❌ ОТВЕТСТВЕННОСТЬ 3: Расчет периметра прямоугольника
            const perimeter = 2 * (this.width + this.height);

            return {area, perimeter};
        }

        throw new Error('Invalid shape type')
    }

    // ❌ ПРОБЛЕМА: Невозможно легко добавить новую фигуру
    // 💡 ЧТО НЕ ТАК: Для добавления Triangle нужно изменить весь класс
    // 🎯 РЕШЕНИЕ: Создать отдельный класс Triangle
    // processTriangle() {
    //     // Пришлось бы добавить новую логику в этот же класс
    // }
}

// ❌ ДЕМОНСТРАЦИЯ ПРОБЛЕМ: Сложность использования
// 💡 ПРОБЛЕМА: Один класс пытается обработать все типы фигур
// 🎯 РЕЗУЛЬТАТ: Путаница и сложность
const circleParams = new ShapeProcessor(5).processShape('circle'); 
const rectangleParams = new ShapeProcessor(undefined, 4, 6).processShape('rectangle'); 

// ❌ ПРОБЛЕМА: Нельзя легко добавить новую фигуру
// const triangleParams = new ShapeProcessor(undefined, 4, 6).processShape('triangle'); // ❌ Нужно изменять класс!

export {};