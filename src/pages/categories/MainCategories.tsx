import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';
import { CgAddR } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axiosInstance from '../../axiosConfig/instanc';
import { FiEdit3 } from 'react-icons/fi';
import Pagination from '../../components/pagination/Pagination';
import DeletePopup from '../../components/popups/DeletePopup';
import EditAddImgPopup from '../../components/popups/EditAddImgPopup';
import { toast } from 'react-toastify';

interface Category {
  parent_id: number;
  category_name: string;
  parent_image: string;
  parent_sort_order: number;
}

type ModalType = 'DELETE' | 'ADD' | 'EDIT' | null;

const MainCategories: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  useEffect(() => {
    const fetchCategoriesCount = async () => {
      try {
        const response = await axiosInstance.get(`/categories/count`);
        setCategoriesCount(Math.ceil(response.data.data.count / 8));
      } catch (err) {
        toast.error(t('categoriesPage.errorFetchingCount'));
      }
    };
    fetchCategoriesCount();
  }, []);
  const changeOrder = async (categories: { id: number; order: number }[]) => {
    try {
      await axiosInstance.patch(
        `/categories`,
        { categories },
        { headers: { 'content-type': 'Application/json' } },
      );
      displayCategories();
      toast.success(t('categoriesPage.categoriesToast'));
    } catch (error) {
      toast.error(t('categoriesPage.errorUpdatingOrder'));
      console.error('Error updating category order:', error);
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
    const reorderedCategories = Array.from(categories);
    const [movedCategory] = reorderedCategories.splice(source.index, 1);
    reorderedCategories.splice(destination.index, 0, movedCategory);
    setCategories(reorderedCategories);
    const updatedCategories = reorderedCategories.map((category, index) => ({
      id: category.parent_id,
      order: index,
    }));
    changeOrder(updatedCategories);
  };

  const displayCategories = async () => {
    try {
      const res = await axiosInstance.get(
        `/categories?page=${currentPage}&limit=1000`,
      );
      setCategories(
        res.data.data.sort(
          (a: Category, b: Category) =>
            a.parent_sort_order - b.parent_sort_order,
        ),
      );
    } catch (error) {
      toast.error(t('categoriesPage.errorFetchingCategories'));
      console.error(error);
    }
  };

  useEffect(() => {
    displayCategories();
  }, [currentPage]);

  const openModal = (type: ModalType, category: Category | null = null) => {
    setSelectedCategory(category);
    setModalType(type);
  };

  const breadcrumbLinks = [
    { label: t('categoriesPage.title'), path: '/categories/main' },
  ];
  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between">
        <Breadcrumb
          pageName={t('categoriesPage.catMain.label')}
          breadcrumbLinks={breadcrumbLinks}
        />
        <Link to={``}>
          <CgAddR
            className="text-3xl text-Input-TextGreen"
            role="button"
            onClick={() => openModal('ADD')}
          />
        </Link>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div className="bg-secondaryBG-light dark:bg-secondaryBG-dark">
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full text-left rtl:text-right text-[20px]"
              >
                <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
                  <tr className="px-2 py-8 text-[20px] font-[400]">
                    <th className="px-2 py-6 text-[20px] font-[400] ">
                      {t('categoriesPage.order')}
                    </th>
                    <th className="px-6 py-6 text-[20px] font-[400]">
                      {t('categoriesPage.catMain.catName')}
                    </th>
                    <th className="px-6 py-6 text-[20px] font-[400]">
                      {t('categoriesPage.catMain.img')}
                    </th>
                    <th className="py-6 text-[20px] font-[400]">
                      {t('categoriesPage.edit')}
                    </th>
                    <th className="py-3 ">
                      <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => (
                    <Draggable
                      key={`cat-${index}`}
                      draggableId={`cat-${cat.parent_id}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`dark:border-secondaryBG-light ${
                            index % 2 !== 0
                              ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                              : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
                          } ${
                            snapshot.isDragging ? 'bg-header-inputBorder' : ''
                          }`}
                        >
                          <td className="px-2 py-4 font-[400] text-[17px]">
                            #{index + 1}
                          </td>
                          <td className="px-6 py-4 font-[400] text-[17px] text-gray-900 whitespace-nowrap dark:text-white">
                            {cat.category_name}
                          </td>
                          <td className="px-6 py-4">
                            <img src={cat.parent_image} alt="" width={40} />
                          </td>
                          <td
                            className="py-4"
                            onClick={() => openModal('EDIT', cat)}
                          >
                            <FiEdit3
                              className="text-xl text-Input-TextGreen"
                              role="button"
                            />
                          </td>
                          <td
                            className="py-4"
                            onClick={() => openModal('DELETE', cat)}
                          >
                            <RiDeleteBin6Line
                              className="text-xl text-Input-TextRed"
                              role="button"
                            />
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </table>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {modalType === 'DELETE' && selectedCategory && (
        <DeletePopup
          deleteName={selectedCategory.category_name}
          deleteId={selectedCategory.parent_id}
          url={`categories`}
          isModalOpen={modalType === 'DELETE'}
          setIsModalOpen={() => setModalType(null)}
          display={displayCategories}
        />
      )}
      {(modalType === 'EDIT' || modalType === 'ADD') && (
        <EditAddImgPopup
          name={selectedCategory?.category_name}
          id={selectedCategory?.parent_id}
          url={`categories`}
          isModalOpen={modalType === 'EDIT' || modalType === 'ADD'}
          setIsModalOpen={() => setModalType(null)}
          display={displayCategories}
          imageUrl={selectedCategory?.parent_image}
        />
      )}

      {/* <Pagination
        currentPage={currentPage}
        totalPages={categoriesCount}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

export default MainCategories;
