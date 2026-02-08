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
// import Pagination from '../../components/pagination/Pagination';
import DeletePopup from '../../components/popups/DeletePopup';
import EditAddPopup from '../../components/popups/EditAddPopup';
import { toast } from 'react-toastify';

interface CategoryMap {
  map_category_id: number;
  name: string;
  sort_order: number;
}

type ModalType = 'DELETE' | 'ADD' | 'EDIT' | null;

const CategoriesMap: React.FC = () => {
  const { t } = useTranslation();
  const [categoriesMap, setCategoriesMap] = useState<CategoryMap[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryMap | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [categoriesCount, setCategoriesCount] = useState<number>(0);
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType, category: CategoryMap | null = null) => {
    setSelectedCategory(category);
    setModalType(type);
  };

  useEffect(() => {
    const fetchCategoriesCount = async () => {
      try {
        const response = await axiosInstance.get<{ data: { count: number } }>(
          `/map-categories/count`,
        );
        setCategoriesCount(response.data.data.count / 8);
      } catch (error) {
        console.error('Failed to fetch categories count:', error);
        toast.error(t('categoriesPage.countError'));
      }
    };
    fetchCategoriesCount();
  }, []);

  const displayCategoriesMap = async () => {
    try {
      const res = await axiosInstance.get<{ data: CategoryMap[] }>(
        `/map-categories?limit=1000&page=${currentPage}`,
      );
      setCategoriesMap(
        res.data.data.sort((a, b) => a.sort_order - b.sort_order),
      );
    } catch (error: any) {
      toast.error(t('categoriesPage.fetchError'));
    }
  };

  // const changeOrder = async (id: number, order: number) => {
  //     try {
  //         await axiosInstance.patch(`/categories`, { categories: [{ id: id, order: order }] });
  //         toast.success(t('categoriesPage.categoriesToast'));
  //     } catch (error: any) {
  //         console.error("Failed to change category order:", error);
  //         toast.error(t('categoriesPage.orderError'));
  //     }
  // };

  // const handleOnDragEnd = (result: DropResult) => {
  //     const { destination, source } = result;
  //     if (!destination || destination.index === source.index) return;
  //     const reorderedCategoriesMap = Array.from(categoriesMap);
  //     const [movedCategory] = reorderedCategoriesMap.splice(source.index, 1);
  //     reorderedCategoriesMap.splice(destination.index, 0, movedCategory);
  //     setCategoriesMap(reorderedCategoriesMap);
  //     changeOrder(movedCategory.map_category_id, destination.index);
  // };

  const changeOrder = async (maps: { id: number; order: number }[]) => {
    try {
      await axiosInstance.patch(`/map-categories`, { maps });
      displayCategoriesMap();
      toast.success(t('categoriesPage.categoriesToast'));
    } catch (error: any) {
      console.error('Failed to change category order:', error);
      toast.error(t(error.response.data.error));
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;
    const reorderedCategoriesMap = Array.from(categoriesMap);
    const [movedCategory] = reorderedCategoriesMap.splice(source.index, 1);
    reorderedCategoriesMap.splice(destination.index, 0, movedCategory);
    setCategoriesMap(reorderedCategoriesMap);
    const updatedCategories = reorderedCategoriesMap.map((category, index) => ({
      id: category.map_category_id,
      order: index,
    }));
    // console.log(updatedCategories);
    // changeOrder(updatedCategories);
  };
  // console.log(categoriesMap);

  useEffect(() => {
    displayCategoriesMap();
  }, [currentPage]);

  // const totalPages = Math.ceil(categoriesCount);
  const breadcrumbLinks = [
    { label: t('categoriesPage.title'), path: '/categories/main' },
  ];

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between">
        <Breadcrumb
          pageName={t('categoriesPage.catMap.label')}
          breadcrumbLinks={breadcrumbLinks}
        />
        <Link to="#">
          <CgAddR
            className="text-3xl text-Input-TextGreen"
            role="button"
            onClick={() => openModal('ADD')}
          />
        </Link>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="categoriesMap">
          {(provided) => (
            <div className="bg-secondaryBG-light dark:bg-secondaryBG-dark ">
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="w-full text-[20px] text-left rtl:text-right"
              >
                <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
                  <tr className="px-2 py-2 text-[18px] font-[400]">
                    <th
                      scope="col"
                      className="px-2 py-6  text-[18px] font-[400] dark:text-secondaryBG-light"
                    >
                      {t('categoriesPage.order')}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-6 text-[18px] font-[400]"
                    >
                      {t('categoriesPage.catMap.regionName')}
                    </th>
                    <th scope="col" className="py-6 text-[18px] font-[400]">
                      {t('categoriesPage.edit')}
                    </th>
                    <th scope="col" className="py-6 text-[18px] font-[400] ">
                      <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesMap.map((cat, index) => (
                    <Draggable
                      key={`cat-${index}`}
                      draggableId={`cat-${cat.map_category_id}-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`dark:border-gray-700 ${
                            index % 2 !== 0
                              ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                              : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
                          } dark:border-secondaryBG-light
                                                        ${
                                                          snapshot.isDragging
                                                            ? 'bg-header-inputBorder'
                                                            : ''
                                                        }`}
                        >
                          <td className="px-2 py-4 font-[400] text-[17px]">
                            #{index + 1}
                          </td>
                          <td className="px-6 py-4 font-[400] text-[17px] text-gray-900 whitespace-nowrap dark:text-white">
                            {cat.name}
                          </td>
                          <td className="py-4 font-[400] text-[17px]">
                            <FiEdit3
                              className="text-xl text-Input-TextGreen"
                              role="button"
                              onClick={() => openModal('EDIT', cat)}
                            />
                          </td>
                          <td
                            className="py-4 font-[400] text-[17px]"
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

      {/* Modals */}
      {modalType === 'DELETE' && selectedCategory && (
        <DeletePopup
          deleteName={selectedCategory.name}
          deleteId={selectedCategory.map_category_id}
          url="map-categories"
          isModalOpen={Boolean(modalType)}
          display={displayCategoriesMap}
          setIsModalOpen={() => setModalType(null)}
        />
      )}
      {(modalType === 'EDIT' || modalType === 'ADD') && (
        <EditAddPopup
          name={
            modalType === 'EDIT' && selectedCategory
              ? selectedCategory.name
              : undefined
          }
          id={
            modalType === 'EDIT' && selectedCategory
              ? selectedCategory.map_category_id
              : undefined
          }
          url="map-categories"
          isModalOpen={Boolean(modalType)}
          setIsModalOpen={() => setModalType(null)}
          display={displayCategoriesMap}
        />
      )}

      {/* Pagination */}
      {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            /> */}
    </div>
  );
};

export default CategoriesMap;
